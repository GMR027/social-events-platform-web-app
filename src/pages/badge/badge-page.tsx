import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Badge from 'src/modules/badge/badge';
import { useSelector } from 'react-redux';

const badge = '/assets/Badge.jpg';

const BadgePage = (): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const badgeURL = `${prefix}${badge}`;

  return (
    <>
      <HorizontalSpace size='medium'/>
      <Badge
        image={badgeURL}
        imageProfile='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
        name='Nombre de usuario con apellidos completos'
        size={100}/>
      <HorizontalSpace size='small'/>
      <SystemCheck />
    </>
  );
};

export default BadgePage;
