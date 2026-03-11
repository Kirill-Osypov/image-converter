import '@testing-library/jest-dom';

// jsdom может не реализовывать createObjectURL/revokeObjectURL
if (!URL.createObjectURL) {
  URL.createObjectURL = function () {
    return 'blob:mock-url';
  };
}
if (!URL.revokeObjectURL) {
  URL.revokeObjectURL = function () {};
}
