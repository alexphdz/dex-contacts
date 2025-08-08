import axios from "axios";
import type { Contact } from "../models/contact";

const DB_URL = import.meta.env.VITE_DB_URL;

/**
 * Creates a new contact in the database
 */
export const createContact = async (contact: Contact) => {
  try {
    const response = await axios.put(`${DB_URL}/contacts/${contact.id}.json`, contact);
    return response.data; 
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

/**
 * Retrieves all contacts from the database
 */
export const getContacts = async () => {
  try {
    const response = await axios.get(`${DB_URL}/contacts.json`);
    return response.data;
  } catch (error) {
    console.error("Error getting contacts:", error);
    throw error;
  }
};

/**
 * Updates an existing contact with partial data
 */
export const updateContact = async (id: string, updates: Partial<Contact>) => {
  try {
    const response = await axios.patch(`${DB_URL}/contacts/${id}.json`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating contact ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a contact from the database
 */
export const deleteContact = async (id: string) => {
  try {
    const response = await axios.delete(`${DB_URL}/contacts/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contact ${id}:`, error);
    throw error;
  }
};
