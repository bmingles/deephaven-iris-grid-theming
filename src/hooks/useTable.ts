import { useEffect, useState } from 'react';
import type { dh as DhType } from '@deephaven/jsapi-types';
import { useApi } from '@deephaven/jsapi-bootstrap';
import { createTable } from '../utils/createTable';

/**
 * React hook for creating a simple ticking Deephaven Table
 */
export function useTable(
  serverUrl: URL,
  tableName: string
): DhType.Table | null {
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
