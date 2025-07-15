import type { dh as DhType } from '@deephaven/jsapi-types';

/**
 * Create a simple ticking table
 */
export async function createTable(
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
