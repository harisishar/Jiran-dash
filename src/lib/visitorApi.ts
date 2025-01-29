export type Visitor = {
  visitorId?: number;
  visitorName: string;
  visitorMobileNo: string;
  visitorNRIC: string;
  visitorQuantity: number;
  visitorPurposeOfVisit: string;
  visitorVehicleType: number;
  visitorVehiclePlate: string;
  approvalStatus?: string;
  unitNumberId: number;
  createdById: number;
  createdDate?: string;
  qrFileName?: string;
  qrExpiryDate?: string;
  unitNumber?: string;
};

export const visitorApi = {
  registerVisitor: async (visitorData: Partial<Visitor>): Promise<void> => {
    try {
      const queryParams = new URLSearchParams({
        providedVisitorName: visitorData.visitorName || '',
        providedVisitorMobileNo: visitorData.visitorMobileNo || '',
        providedVisitorNRIC: visitorData.visitorNRIC || '',
        providedQuantity: visitorData.visitorQuantity?.toString() || '0',
        providedPurposeOfVisit: visitorData.visitorPurposeOfVisit || '',
        providedVehicleType: visitorData.visitorVehicleType?.toString() || '0',
        providedPlateNo: visitorData.visitorVehiclePlate || '',
        providedUnitNumberID: visitorData.unitNumberId?.toString() || '0',
        providedCreatedByID: visitorData.createdById?.toString() || '0',
      });

      const response = await fetch(`/api/User/RegisterVisitor?${queryParams.toString()}`, {
        method: 'POST',
        headers: {
          'Accept': '*/*'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to register visitor: ${response.status} ${response.statusText} - ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error registering visitor:', error);
      throw error;
    }
  },

  getVisitorById: async (id: string): Promise<Visitor> => {
    try {
      const response = await fetch(`/api/User/GetVisitor?unitUserID=${id}`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(`Failed to fetch visitor: ${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const visitors = await response.json();
      return visitors.find((visitor: Visitor) => visitor.visitorId === parseInt(id));
    } catch (error) {
      console.error('Error fetching visitor:', error);
      throw error;
    }
  },

  updateVisitor: async (visitorData: Partial<Visitor>): Promise<void> => {
    try {
      const queryParams = new URLSearchParams({
        providedVisitorID: visitorData.visitorId?.toString() || '',
        providedVisitorName: visitorData.visitorName || '',
        providedVisitorMobileNo: visitorData.visitorMobileNo || '',
        providedVisitorNRIC: visitorData.visitorNRIC || '',
        providedQuantity: visitorData.visitorQuantity?.toString() || '0',
        providedPurposeOfVisit: visitorData.visitorPurposeOfVisit || '',
        providedVehicleType: visitorData.visitorVehicleType?.toString() || '0',
        providedPlateNo: visitorData.visitorVehiclePlate || '',
        providedUnitNumberID: visitorData.unitNumberId?.toString() || '0',
        providedCreatedByID: visitorData.createdById?.toString() || '0',
        providedStatus: visitorData.approvalStatus || 'A',
      });

      const response = await fetch(`/api/User/UpdateVisitor?${queryParams.toString()}`, {
        method: 'POST',
        headers: {
          'Accept': '*/*'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
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