// Helper functions for formatting numbers, dates, rainfall, and severity

export function formatRainfall(mm) {
  if (mm === undefined || mm === null) return '0 mm';
  return `${Number(mm).toFixed(1)} mm`;
}

export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

export function getRiskBadgeClass(severity) {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return 'badge-critical';
    case 'high':
      return 'badge-high';
    case 'moderate':
      return 'badge-moderate';
    case 'low':
    default:
      return 'badge-low';
  }
}

export function getRoadStatusBadgeClass(status) {
  switch (status?.toLowerCase()) {
    case 'blocked':
      return 'badge-critical';
    case 'restricted':
      return 'badge-high';
    case 'caution':
      return 'badge-moderate';
    case 'open':
    default:
      return 'badge-low';
  }
}
