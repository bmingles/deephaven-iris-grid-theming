import { useEffect, useState } from 'react';
import { useApi } from '@deephaven/jsapi-bootstrap';
import type { dh as DhType } from '@deephaven/jsapi-types';
import { IrisGridModelFactory, type IrisGridModel } from '@deephaven/iris-grid';

/**
 * React hook for creating an IrisGridModel from a Table
 */
export function useModel(table: DhType.Table | null): IrisGridModel | null {
  const dh = useApi();

  const [model, setModel] = useState<IrisGridModel | null>(null);

  useEffect(() => {
    async function loadTable() {
      if (table == null) {
        return;
      }
      const model = await IrisGridModelFactory.makeModel(dh, table);
      setModel(model);
    }

    loadTable();
  }, [dh, table]);

  return model;
}
