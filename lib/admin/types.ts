export type LocationStatus = "active" | "reserved" | "completed" | "cancelled";
export type MachineStatus = "available" | "rented" | "maintenance";
export type DevisStatus = "pending" | "validated" | "rejected";
export type UserRole = "admin" | "employee";

export interface Client {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  address: string;
  totalLocations: number;
  totalSpent: number;
  createdAt: string;
  notes?: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  status: MachineStatus;
  dailyRate: number;
  weeklyRate: number;
  lastMaintenance: string;
  nextMaintenance: string;
  hoursUsed: number;
  notes?: string;
}

export interface RentalLocation {
  id: string;
  clientId: string;
  clientName: string;
  machineId: string;
  machineName: string;
  startDate: string;
  endDate: string;
  status: LocationStatus;
  totalAmount: number;
  deposit: number;
  notes?: string;
  createdAt: string;
}

export interface DevisItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Devis {
  id: string;
  reference: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  items: DevisItem[];
  totalAmount: number;
  status: DevisStatus;
  validUntil: string;
  notes?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: "revenue" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin: string;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  locations: number;
}

export interface ActivityEvent {
  id: string;
  type: "location" | "devis" | "client" | "machine" | "finance";
  message: string;
  time: string;
}
