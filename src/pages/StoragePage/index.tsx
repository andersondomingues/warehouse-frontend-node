import './storagepage.module.scss';

import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { AxiosResponse } from 'axios';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Navigator } from '../../components/Navigator';
import { FormPage } from '../../components/FormPage';
import { api } from '../../services/api';
import { LoadingIcon } from '../../components/LoadingIcon';
import { StorageItem } from '../../components/StorageItem';

interface StorageItemData {
  id: number;
  name: string;
  quantity: string;
  weight: string
}

export function StoragePage() {
  const [storageItems, setStorageItems] = useState<StorageItemData[]>([]);

  const ref = useRef<LoadingBarRef>(null);

  const history = useHistory();

  useEffect(() => {
    const getStorageItems = async () => {
      const data = {};

      const response: Promise<AxiosResponse<any, any>> = api.get('getStorageItems', data);
      response.then((resolved) => {
        const items: StorageItemData[] = resolved.data;
        setStorageItems(items);
        return items;
      });
    };

    getStorageItems();
  }, []);

  const handleClick = async () => {
    ref!.current!.continuousStart(0, 200);

    const item = { name: '' };

    const response = await api.post('storage/putItem', item);
    const { projectId } = response.data;

    ref!.current!.complete();
  };

  return (
    <div>
      <LoadingBar color="#f11946" ref={ref} />
      <Header />
      <Navigator />
      <FormPage>
        <br />
        <form>
          <h1>Storage</h1>

          <LoadingIcon active={(storageItems.length === 0)} />
          { storageItems?.map((x: StorageItemData) => (
            <StorageItem data={x} />
          ))}

          <br />
          <br />
          <button type="button" onClick={handleClick}>Create New Item</button>

          <hr />

        </form>
        <br />
        <br />
        <form>
          <h1>Truck</h1>

          <LoadingIcon active={(storageItems.length === 0)} />
          { storageItems?.map((x: StorageItemData) => (
            <StorageItem data={x} />
          ))}

          <br />
          <br />
          <button type="button" onClick={handleClick}>Create New Item</button>

          <hr />

        </form>
        <br />
      </FormPage>
      <Footer />
    </div>
  );
}
