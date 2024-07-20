export const base_url = 'https://account.monngonne.com/api/';
const expiresday = new Date();
const expires60day = new Date();
expiresday.setDate(expiresday.getDate() + 1);
expires60day.setDate(expires60day.getDate() + 60);
export { expiresday, expires60day };