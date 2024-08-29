import { render } from '@testing-library/react';

import LibsComponents from './libs-components';

describe('LibsComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibsComponents />);
    expect(baseElement).toBeTruthy();
  });
});
