import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        // We need 3 stages
        { duration: '10s', target: 5 },
        { duration: '10s', target: 5 },
        { duration: '15s', target: 20 },
        { duration: '10s', target: 5 },
        { duration: '10s', target: 20 },
        { duration: '10s', target: 5 },
        { duration: '10s', target: 5 },
        { duration: '10s', target: 0 }
    ],
    ext: {
        loadimpact: {
          // Project: Default project
          projectID: 3651030,
          // Test runs with the same name groups test runs together
          name: 'stages'
        }
      }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
