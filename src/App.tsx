import { useEffect, useState } from 'react';
import type { dh as DhType } from '@deephaven/jsapi-types';
import {
  IrisGrid,
  IrisGridModelFactory,
  type IrisGridModel,
} from '@deephaven/iris-grid';
import { useApi } from '@deephaven/jsapi-bootstrap';
import { LoadingOverlay } from '@deephaven/components';

interface AppProps {
  serverUrl: URL;
}

/**
 * App component containing an IrisGrid showing a simple ticking table
 */
export function App({ serverUrl }: AppProps): JSX.Element {
  const table = useTable(serverUrl, 'simple_ticking');
  const model = useModel(table);

  if (model == null) {
    return <LoadingOverlay />;
  }

  return <IrisGrid model={model} />;
}

/**
 * React hook for creating a simple ticking Deephaven Table
 */
function useTable(serverUrl: URL, tableName: string): DhType.Table | null {
  const dh = useApi();
  const [table, setTable] = useState<DhType.Table | null>(null);

  useEffect(() => {
    async function loadTable() {
      const table = await createTable(dh, serverUrl, tableName);
      setTable(table);
    }

    loadTable();
  }, [dh, serverUrl, tableName]);

  return table;
}

/**
 * React hook for creating an IrisGridModel from a Table
 */
function useModel(table: DhType.Table | null): IrisGridModel | null {
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

/**
 * Create a simple ticking table
 */
async function createTable(
  dh: typeof DhType,
  serverUrl: URL,
  tableName: string
): Promise<DhType.Table> {
  const client = new dh.CoreClient(serverUrl.origin);
  await client.login({
    type: dh.CoreClient.LOGIN_TYPE_ANONYMOUS,
  });
  const cn = await client.getAsIdeConnection();
  const session = await cn.startSession('python');

  const result = await session.runCode(
    [
      'from deephaven import time_table',
      `${tableName} = time_table("PT2S")`,
    ].join('\n')
  );

  const definition = await result.changes.created[0];

  return await session.getObject(definition);
}
