
// import '@testing-library/jest-dom';

// // Mock next/router
// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '/',
//       query: {},
//       asPath: '/',
//       push: jest.fn(),
//       pop: jest.fn(),
//       reload: jest.fn(),
//       back: jest.fn(),
//       prefetch: jest.fn().mockResolvedValue(undefined),
//       beforePopState: jest.fn(),
//       events: {
//         on: jest.fn(),
//         off: jest.fn(),
//         emit: jest.fn(),
//       },
//     };
//   },
// }));

// // Mock next/navigation
// jest.mock('next/navigation', () => ({
//   useRouter() {
//     return {
//       push: jest.fn(),
//       replace: jest.fn(),
//       prefetch: jest.fn(),
//       back: jest.fn(),
//       forward: jest.fn(),
//       refresh: jest.fn(),
//     };
//   },
//   useSearchParams() {
//     return new URLSearchParams();
//   },
//   usePathname() {
//     return '/';
//   },
// }));

// // Mock next-auth
// jest.mock('next-auth/react', () => ({
//   useSession: jest.fn(() => ({
//     data: null,
//     status: 'unauthenticated',
//   })),
//   signIn: jest.fn(),
//   signOut: jest.fn(),
//   SessionProvider: ({ children }: { children: React.ReactNode }) => children,
// }));
