import { IrisGrid } from '@deephaven/iris-grid';
import { LoadingOverlay, ThemePicker } from '@deephaven/components';
import { useTable } from './hooks/useTable';
import { useModel } from './hooks/useModel';

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

  return (
    <div className="App">
      <ThemePicker />
      <IrisGrid model={model} />
    </div>
  );
}
