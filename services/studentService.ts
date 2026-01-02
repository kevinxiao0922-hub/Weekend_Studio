import { Student } from '../types';
import { authenticateStudent as mockAuth } from './mockData';

// ------------------------------------------------------------------
// CONFIGURATION AREA (配置区)
// ------------------------------------------------------------------

// 1. Google Apps Script Web App URL (请确保是您“新版本”部署后的链接)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwuLvvT6rNAHAocfcLNFRZks1tKN3nXKjGBb054lGgoHb22LV7sFlhfQqH1e1Hen91lRA/exec"; 

// 2. API Security Key (必须与脚本中的 CONFIG.API_SECRET 一致)
const API_SECRET = "MySecretKey_2025_Secure";

// ------------------------------------------------------------------

/**
 * 注意：如果您在 Google Apps Script 中遇到 "Unexpected token '*'" 错误，
 * 是因为您把代码外层的注释星号也复制进去了。
 * 请直接使用我刚才回复您的纯净版 Javascript 代码。
 */

interface ApiResponse {
  success: boolean;
  data?: Student;
  message?: string;
}

export const loginStudent = async (id: string, password: string): Promise<Student> => {
  // 如果没有配置 URL，则使用本地模拟数据测试
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_SCRIPT_URL")) {
    console.warn("Using Mock Data: No valid Google Script URL found.");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const student = mockAuth(id, password);
        student ? resolve(student) : reject(new Error("Invalid credentials (Mock Mode)"));
      }, 800);
    });
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', // 确保跨域开启
      body: JSON.stringify({ 
        action: 'login', 
        id: id, 
        password: password, 
        apiSecret: API_SECRET 
      }), 
    });

    if (!response.ok) {
      throw new Error(`Server status error: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.message || "Invalid Student ID or Password");
    }
  } catch (error) {
    console.error("API Connection Error:", error);
    throw error instanceof Error ? error : new Error("Could not connect to the authentication server.");
  }
};