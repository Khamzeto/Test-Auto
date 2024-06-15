'use client'; // Обозначаем этот компонент как клиентский

import { useState, useEffect } from 'react';
import { getFilters } from '../lib/api';
import { Form, Accordion } from 'react-bootstrap';
import styles from './Filters.module.css'; // импортируем стили

type FilterProps = {
  onChange: (filters: any) => void;
};

const Filters: React.FC<FilterProps> = ({ onChange }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [allModels, setAllModels] = useState<any[]>([]);
  const [models, setModels] = useState<any>({});
  const [tariffs, setTariffs] = useState<{ id: string; name: string }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<any>({
    brand: [],
    model: [],
    tarif: [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getFilters();
        console.log('Fetched filters:', data);

        const brands = Array.isArray(data.brands.values) ? data.brands.values : [];
        const allModels = Array.isArray(data.models.values) ? data.models.values : [];
        const tariffsObj = data.tarif?.values || {};
        const tariffs = Object.entries(tariffsObj).map(([id, name]) => ({
          id,
          name: name as string,
        }));

        const modelsGroupedByBrand = allModels.reduce((acc: any, modelGroup: any) => {
          acc[modelGroup.brand] = modelGroup.models;
          return acc;
        }, {});

        setBrands(brands);
        setAllModels(allModels);
        setModels(modelsGroupedByBrand);
        setTariffs(tariffs);
      } catch (error) {
        console.error('Error fetching filters:', error);
        setBrands([]);
        setAllModels([]);
        setModels({});
        setTariffs([]);
      }
    };
    fetchFilters();
  }, []);

  const handleCheckboxChange = (key: string, value: string) => {
    const updatedFilters = { ...selectedFilters };
    if (updatedFilters[key].includes(value)) {
      updatedFilters[key] = updatedFilters[key].filter((item: string) => item !== value);
    } else {
      updatedFilters[key].push(value);
    }
    setSelectedFilters(updatedFilters);
    console.log('Updated filters:', updatedFilters);
    onChange(updatedFilters);

    if (key === 'brand') {
      const selectedBrands = updatedFilters[key];
      const filteredModels = allModels
        .filter(modelGroup => selectedBrands.includes(modelGroup.brand))
        .flatMap(modelGroup => modelGroup.models);
      setModels({ ...models, filteredModels });
    }
  };

  return (
    <div className={styles.filters}>
      <Accordion defaultActiveKey={['1', '2', '3']} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Марки</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formBrands">
              <Form.Check
                type="checkbox"
                label="Все"
                value="Все"
                onChange={() => handleCheckboxChange('brand', 'Все')}
                checked={selectedFilters.brand.length === 0}
              />
              {brands.map((brand: string) => (
                <Form.Check
                  type="checkbox"
                  label={brand}
                  key={brand}
                  value={brand}
                  onChange={e => handleCheckboxChange('brand', e.target.value)}
                  checked={selectedFilters.brand.includes(brand)}
                />
              ))}
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Модели</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formModels">
              <Form.Check
                type="checkbox"
                label="Все"
                value="Все"
                onChange={() => handleCheckboxChange('model', 'Все')}
                checked={selectedFilters.model.length === 0}
              />
              {Object.keys(models).map((brand: string) => (
                <div key={brand}>
                  <h5>{brand}</h5>
                  {models[brand].map((model: string) => (
                    <Form.Check
                      type="checkbox"
                      label={model}
                      key={model}
                      value={model}
                      onChange={e => handleCheckboxChange('model', e.target.value)}
                      checked={selectedFilters.model.includes(model)}
                    />
                  ))}
                </div>
              ))}
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Тарифы</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formTariffs">
              <Form.Check
                type="checkbox"
                label="Все"
                value="Все"
                onChange={() => handleCheckboxChange('tarif', 'Все')}
                checked={selectedFilters.tarif.length === 0}
              />
              {tariffs.map(tarif => (
                <Form.Check
                  type="checkbox"
                  label={tarif.name}
                  key={tarif.id}
                  value={tarif.id}
                  onChange={e => handleCheckboxChange('tarif', e.target.value)}
                  checked={selectedFilters.tarif.includes(tarif.id)}
                />
              ))}
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Filters;
