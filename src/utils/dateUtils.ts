export const formatDistanceToNow = (date: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());
  
  // Convert to appropriate time units
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) {
    return years === 1 ? 'há 1 ano' : `há ${years} anos`;
  } else if (months > 0) {
    return months === 1 ? 'há 1 mês' : `há ${months} meses`;
  } else if (days > 0) {
    return days === 1 ? 'há 1 dia' : `há ${days} dias`;
  } else if (hours > 0) {
    return hours === 1 ? 'há 1 hora' : `há ${hours} horas`;
  } else if (minutes > 0) {
    return minutes === 1 ? 'há 1 minuto' : `há ${minutes} minutos`;
  } else {
    return 'agora mesmo';
  }
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};