export {};

declare global {
  interface Window {
    electron?: {
      saveEod: (data: {
        employeeName: string;
        fileName: string;
        fileUrl: string;
        submittedAt: string;
      }) => Promise<any>;
    };
  }
}