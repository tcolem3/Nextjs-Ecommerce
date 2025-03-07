export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore 22';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern ecommerce store built with Next JS';
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
    email: '',
    password: '',
};

export const signUpDefaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};
// export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 6;

// export const shippingAddressDefaultValues = {
//     fullName: 'John Doe',
//     streetAddress: '123 Main st',
//     city: 'Anytown',
//     postalCode: '12345',
//     country: 'USA',
//   };

export const shippingAddressDefaultValues = {
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
  };

  export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS?.split(', ') : ['PayPal', 'Stripe', 'CashOnDelivery'];
  export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';