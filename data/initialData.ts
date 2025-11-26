import { Product, Category, User } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  { "id": 1, "name": "قهوة سادة", "weight": "200g", "price": 185, "category": "coffee" },
  { "id": 2, "name": "قهوة محوجة", "weight": "200g", "price": 190, "category": "coffee" },
  { "id": 3, "name": "قهوة بندق", "weight": "200g", "price": 185, "category": "coffee" },
  { "id": 4, "name": "قهوة سريعة التحضير", "weight": "100g", "price": 180, "category": "coffee" },
  { "id": 5, "name": "كابتشينو فانيليا", "weight": "200g", "price": 180, "category": "cappuccino" },
  { "id": 6, "name": "كابتشينو بندق", "weight": "200g", "price": 185, "category": "cappuccino" },
  { "id": 7, "name": "كابتشينو كراميل", "weight": "200g", "price": 185, "category": "cappuccino" },
  { "id": 8, "name": "نسكافية جولد", "weight": "100g", "price": 195, "category": "nescafe" }
];

export const INITIAL_CATEGORIES: Category[] = [
  { "id": 1, "name": "coffee", "label": "القهوة" },
  { "id": 2, "name": "cappuccino", "label": "الكابتشينو" },
  { "id": 3, "name": "nescafe", "label": "النسكافية" }
];

export const INITIAL_USERS: User[] = [
  {
    "username": "admin",
    "password": "admin123456",
    "role": "admin"
  }
];