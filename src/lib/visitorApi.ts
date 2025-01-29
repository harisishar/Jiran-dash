export type Visitor = {
  visitorId: number;
  visitorName: string;
  visitorMobileNo: string;
  visitorNRIC: string;
  visitorQuantity: number;
  visitorPurposeOfVisit: string;
  visitorVehicleType: string | null;
  visitorVehicle: string | null;
  visitorVehiclePlate: string;
  approvalStatus: string;
  unitNumberId: number;
  createdById: number | null;
  createdDate: string | null;
  qrFileName: string | null;
  qrExpiryDate: string | null;
  unitNumber: string | null;
};

export const visitorApi = {
  registerVisitor: async (visitorData: Partial<Visitor>): Promise<void> => {
    try {
      const response = await fetch('https://jiran-webapi.onrender.com/User/RegisterVisitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(visitorData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to register visitor: ${response.status} ${response.statusText} - ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error registering visitor:', error);
      throw error;
    }
  },

  updateVisitor: async (visitorData: Partial<Visitor>): Promise<void> => {
    try {
      const response = await fetch('https://jiran-webapi.onrender.com/User/UpdateVisitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(visitorData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update visitor: ${response.status} ${response.statusText} - ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating visitor:', error);
      throw error;
    }
  },

  getVisitors: async (): Promise<Visitor[]> => {
    try {
      const response = await fetch('/api/User/GetVisitor', {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch visitors: ${response.status} ${response.statusText} - ${errorData.message}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching visitors:', error);
      throw error;
    }
  }
}; 