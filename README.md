# Currency Calculation API

This project implements a simple API for calculating currency conversions and discounts based on user types. It utilizes NestJS for building the API endpoints and services.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [SonarCloud](https://sonarcloud.io/) account and token

## Installation

1. Clone this repository to your local machine.
2. Install dependencies by running npm install.

```sh
npm install
```

## To Run the Code

Start the application by running

```sh
npm run start:dev
```

## Endpoints

- ### Billings Controller

#### POST /calculate

Calculates the final amount payable in the target currency after applying discounts.

**Request Body**:

```sh
{
  "items": [
    {
      "category": "string",
      "amount": "number"
    }
  ],
  "totalAmount": "number",
  "userType": "string",
  "customerTenure": "number",
  "originalCurrency": "string",
  "targetCurrency": "string"
}
```

**Response**:

```sh
{
  "netAmountPayable": "number",
  "currency": "string"
}
```

## Services

#### Billings Service

- Provides methods for calculating final amounts after applying discounts.
- Utilizes CurrencyExchangeService for currency conversion.

#### Currency Exchange Service

- Handles fetching currency exchange rates and converting amounts between currencies.

## Usage

1. Send a POST request to `/api/calculate` with the required parameters to calculate the final amount payable.
2. The API will apply discounts based on user type and tenure, convert the amount to USD, apply additional discounts, and return the final amount in the target currency.

## Testing

1. Run tests using Jest by running `npm run test`.
2. Test cases cover the functionality of `BillingsService` and `CurrencyExchangeService`.

## Coverage

To check the test coverage, run:

```sh
npm run test:cov
```

This will generate a coverage report in the `coverage` directory. Open `index.html` in a browser to view the detailed report.

## Run SonarCloud Analysis

1. Ensure having a SonarCloud account and a project set up.
2. Add SonarCloud token to the environment variables:
   ```sh
   export SONAR_TOKEN=your_sonarcloud_token
   ```
3. Install the SonarQube Scanner:
   ```sh
   npm install -g sonarqube-scanner
   ```
4. Run the SonarCloud analysis, replace the project key and the organization with the one in your project:
   ```sh
   sonar-scanner \
   -Dsonar.organization=rakibul-backend \
   -Dsonar.projectKey=rakibul-billing-backend \
   -Dsonar.sources=. \
   -Dsonar.host.url=https://sonarcloud.io
   ```
5. Running this will generate a report on the sonar cloud dashboard in your project
