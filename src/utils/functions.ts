export const formatCurrency = (value:number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const maskCreditCardNumber = (number: string): string => {
  const visibleDigits = number.substring(0, 4);
  const maskedDigits = number.substring(4, number.length - 6).replace(/./g, '*');
  const lastDigits = number.substring(number.length - 6);
  return `${visibleDigits}${maskedDigits}${lastDigits}`;
};

export const formatDate = (date: string | Date, format: string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  format = format.replace('YYYY', String(year));
  format = format.replace('MM', month);
  format = format.replace('DD', day);

  return format;
};

export const removeElementById = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
}

export function getDefaultFavicon(tenant:string) {
  try {
    const existingFile = require(`../assets/images/favicon/icon-${tenant}.ico`);
    return existingFile;
  } catch (e) {
    const defaultFile = require(`../assets/images/favicon/icon-default.ico`);
    return defaultFile;
  }
}

export const checkIfFile = async (filePath: string): Promise<any> => {
 let theTheme

	try {
    theTheme = await require(`../themes/${filePath}`).theme(true)
	} catch (error) {
    theTheme = await require(`../themes/ligth-theme`).theme(true)
	}

 return theTheme;
};
