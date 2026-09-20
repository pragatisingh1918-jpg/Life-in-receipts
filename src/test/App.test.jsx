import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import ReceiptCard from '../components/ReceiptCard';

const mockReceipt = {
  id: "test_rec_1",
  timestamp: "2018-08-31 22:01:00",
  date: "31/08/2018",
  time: "22:01",
  category: "Purchases",
  subcategory: "Dinner",
  item: "Domino's Gourmet Pizza",
  mode: "Credit Card",
  amount: 510.85,
  currency: "INR",
  type: "Expense",
  location: "Domino's Pizza Outlet",
  mood: "Craving",
  icon: "Utensils",
  note: "Celebratory dinner",
  tags: ["Pizza", "Treat"],
  connectedIds: ["rec_101"],
  chronotype: "Night Owl",
  insights: "Food craving test insight"
};

describe('Component Testing & Reliability Audit Suite', () => {
  it('renders App title and navigation headers', () => {
    render(<App />);
    expect(screen.getByText(/Life Receipts/i)).toBeInTheDocument();
    expect(screen.getByText(/Receipt Stream/i)).toBeInTheDocument();
    expect(screen.getByText(/Spotify Vault/i)).toBeInTheDocument();
  });

  it('renders ReceiptCard component with item details correctly', () => {
    render(<ReceiptCard receipt={mockReceipt} />);
    expect(screen.getByText(/Domino's Gourmet Pizza/i)).toBeInTheDocument();
    expect(screen.getByText(/₹510.85/i)).toBeInTheDocument();
  });

  it('expands receipt details when toggle button is clicked', () => {
    render(<ReceiptCard receipt={mockReceipt} />);
    const detailsBtn = screen.getByText(/Details/i);
    fireEvent.click(detailsBtn);
    expect(screen.getByText(/#Pizza/i)).toBeInTheDocument();
  });
});
