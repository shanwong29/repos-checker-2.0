declare let process: {
  env: {
    [key: string]: string;
  };
};

const prod = {
  url: {
    API_URL: `https://repos-checker-server.herokuapp.com/api`,
  },
};

const dev = {
  url: {
    API_URL: `/api`,
  },
};

export const config = process.env.NODE_ENV === `development` ? dev : prod;
