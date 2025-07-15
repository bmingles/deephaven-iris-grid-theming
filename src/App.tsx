import { IrisGrid } from '@deephaven/iris-grid';
import type { dh as DhType } from '@deephaven/jsapi-types';
import { LoadingOverlay, ThemePicker, useTheme } from '@deephaven/components';
import { useTable } from './hooks/useTable';
import { useModel } from './hooks/useModel';

interface AppProps {
  serverUrl: URL;
}

const sorts: DhType.Sort[] = [];
const customColumns: string[] = [];

/**
 * App component containing an IrisGrid showing a simple ticking table
 */
export function App({ serverUrl }: AppProps): JSX.Element {
  const table = useTable(serverUrl, 'simple_ticking');
  const model = useModel(table);

  console.log(useTheme());

  if (model == null) {
    return <LoadingOverlay />;
  }

  return (
    <div className="App">
      <ThemePicker />
      <IrisGrid model={model} customColumns={customColumns} sorts={sorts} />
    </div>
  );
}
