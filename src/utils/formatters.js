/**
 * Format currency amounts in Indian Rupees (INR)
 * @param {number} amount 
 * @returns {string}
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0.00';
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format timestamp into readable time and date
 * @param {string} timestamp 
 * @returns {{ date: string, time: string }}
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return { date: 'N/A', time: '12:00' };
  const d = new Date(timestamp);
  if (isNaN(d.getTime())) return { date: timestamp, time: '12:00' };
  return {
    date: d.toLocaleDateString('en-IN'),
    time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  };
}
