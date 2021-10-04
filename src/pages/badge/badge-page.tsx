import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Badge from 'src/modules/badge/badge';

const BadgePage = (): React.ReactElement => {

  return (
    <>
      <HorizontalSpace size='medium'/>
      <Badge />
      <HorizontalSpace size='small'/>
      <SystemCheck />
    </>
  );
};

export default BadgePage;
