export const getIcon = ( type: string ): string => {
  switch (type) {
    case 'front-end':
      return 'format_shapes';
    case 'back-end':
      return 'memory';
    case 'server':
      return 'blur_circular';
    case 'ci-cd':
      return 'settings';
    case 'design':
      return 'palette';
    case 'documentation':
      return 'import_contacts';
    case 'change':
      return 'build';
    case 'improvement':
      return 'filter_list';
    case 'bugfix':
      return 'bug_report';
    case 'integration':
      return 'extension';
    default:
      return '';
  }
};

export const getType = ( type: string ): string => {
  switch (type) {
    case 'front-end':
      return 'Frontend';
    case 'back-end':
      return 'Backend';
    case 'server':
      return 'Server';
    case 'ci-cd':
      return 'Continuous Integration';
    case 'design':
      return 'Diseno';
    case 'documentation':
      return 'Documentacion';
    case 'change':
      return 'Cambio';
    case 'improvement':
      return 'Mejora';
    case 'bugfix':
      return 'Correccion de error';
    case 'integration':
      return 'Integracion de biblioteca';
    default:
      return '';
  }
};
