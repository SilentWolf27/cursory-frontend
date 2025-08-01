interface Props {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AILoadingState({
  title = 'Generando con IA',
  description = 'Nuestra IA está procesando tu solicitud. Esto puede tomar unos segundos...',
  size = 'md',
}: Props) {
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'w-12 h-12',
      iconInner: 'w-6 h-6',
      title: 'text-lg',
      description: 'text-sm',
      progress: 'max-w-xs',
    },
    md: {
      container: 'py-12',
      icon: 'w-16 h-16',
      iconInner: 'w-8 h-8',
      title: 'text-xl',
      description: 'text-base',
      progress: 'max-w-xs',
    },
    lg: {
      container: 'py-16',
      icon: 'w-20 h-20',
      iconInner: 'w-10 h-10',
      title: 'text-2xl',
      description: 'text-lg',
      progress: 'max-w-sm',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`flex flex-col items-center justify-center ${classes.container}`}
    >
      <div
        className={`${classes.icon} bg-blue-100 rounded-full flex items-center justify-center mb-6`}
      >
        <svg
          className={`${classes.iconInner} text-blue-600 animate-spin`}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 13L7.28446 14.5689C7.54995 15.0999 7.68269 15.3654 7.86003 15.5954C8.01739 15.7996 8.20041 15.9826 8.40455 16.14C8.63462 16.3173 8.9001 16.4501 9.43108 16.7155L11 17.5L9.43108 18.2845C8.9001 18.5499 8.63462 18.6827 8.40455 18.86C8.20041 19.0174 8.01739 19.2004 7.86003 19.4046C7.68269 19.6346 7.54995 19.9001 7.28446 20.4311L6.5 22L5.71554 20.4311C5.45005 19.9001 5.31731 19.6346 5.13997 19.4046C4.98261 19.2004 4.79959 19.0174 4.59545 18.86C4.36538 18.6827 4.0999 18.5499 3.56892 18.2845L2 17.5L3.56892 16.7155C4.0999 16.4501 4.36538 16.3173 4.59545 16.14C4.79959 15.9826 4.98261 15.7996 5.13997 15.5954C5.31731 15.3654 5.45005 15.0999 5.71554 14.5689L6.5 13Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 2L16.1786 5.06442C16.4606 5.79765 16.6016 6.16426 16.8209 6.47264C17.0153 6.74595 17.254 6.98475 17.5274 7.17909C17.8357 7.39836 18.2024 7.53937 18.9356 7.82138L22 9L18.9356 10.1786C18.2024 10.4606 17.8357 10.6016 17.5274 10.8209C17.254 11.0153 17.0153 11.254 16.8209 11.5274C16.6016 11.8357 16.4606 12.2024 16.1786 12.9356L15 16L13.8214 12.9356C13.5394 12.2024 13.3984 11.8357 13.1791 11.5274C12.9847 11.254 12.746 11.0153 12.4726 10.8209C12.1643 10.6016 11.7976 10.4606 11.0644 10.1786L8 9L11.0644 7.82138C11.7976 7.53937 12.1643 7.39836 12.4726 7.17909C12.746 6.98475 12.9847 6.74595 13.1791 6.47264C13.3984 6.16426 13.5394 5.79765 13.8214 5.06442L15 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className={`${classes.title} font-semibold text-gray-900 mb-2`}>
        {title}
      </h3>
      <p
        className={`${classes.description} text-gray-600 text-center max-w-md`}
      >
        {description}
      </p>
      <div className={`mt-6 w-full ${classes.progress}`}>
        <div className="bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
