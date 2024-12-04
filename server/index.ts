import express from 'express';
import cors from 'cors';
import twilio from 'twilio';
import dotenv from 'dotenv';
import { AccessToken } from 'twilio/lib/jwt/AccessToken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Load environment variables from .env file
const envPath = join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;
const apiKey = process.env.VITE_TWILIO_API_KEY;
const apiSecret = process.env.VITE_TWILIO_API_SECRET;
const twimlAppSid = process.env.VITE_TWILIO_TWIML_APP_SID;
const phoneNumber = process.env.VITE_TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    twilioConfigured: !!(accountSid && authToken && apiKey && apiSecret)
  });
});

// Token generation endpoint with better error handling
app.get('/api/twilio-token', (req, res) => {
  try {
    if (!accountSid || !apiKey || !apiSecret || !twimlAppSid) {
      throw new Error('Missing required Twilio credentials');
    }

    const accessToken = new AccessToken(
      accountSid,
      apiKey,
      apiSecret,
      { 
        identity: 'user',
        ttl: 3600 // Token valid for 1 hour
      }
    );

    const VoiceGrant = AccessToken.VoiceGrant;
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twimlAppSid,
      incomingAllow: true
    });

    accessToken.addGrant(voiceGrant);
    
    const token = accessToken.toJwt();
    
    // Validate token was generated
    if (!token) {
      throw new Error('Failed to generate access token');
    }

    res.json({ 
      token,
      identity: 'user',
      expires: new Date(Date.now() + 3600000).toISOString()
    });
  } catch (error: any) {
    console.error('Error generating token:', error);
    res.status(500).json({ 
      error: 'Failed to generate token',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Voice TwiML endpoint with enhanced error handling
app.post('/api/voice', (req, res) => {
  try {
    if (!phoneNumber) {
      throw new Error('Twilio phone number not configured');
    }

    const twiml = new twilio.twiml.VoiceResponse();
    const dial = twiml.dial({
      callerId: phoneNumber,
      answerOnBridge: true,
      timeout: 30
    });
    
    if (req.body.To) {
      dial.number({
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        statusCallback: '/api/call-status',
        statusCallbackMethod: 'POST'
      }, req.body.To);
    } else {
      throw new Error('Destination phone number not provided');
    }

    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error: any) {
    console.error('Error generating TwiML:', error);
    res.status(500).json({ 
      error: 'Failed to generate TwiML',
      message: error.message 
    });
  }
});

// Call status webhook with detailed logging
app.post('/api/call-status', (req, res) => {
  try {
    const callStatus = {
      callSid: req.body.CallSid,
      status: req.body.CallStatus,
      direction: req.body.Direction,
      from: req.body.From,
      to: req.body.To,
      duration: req.body.CallDuration,
      timestamp: new Date().toISOString()
    };
    
    console.log('Call Status Update:', JSON.stringify(callStatus, null, 2));
    res.sendStatus(200);
  } catch (error: any) {
    console.error('Error processing call status:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment configuration:', {
    accountSid: accountSid ? '...configured...' : 'missing',
    apiKey: apiKey ? '...configured...' : 'missing',
    twimlAppSid: twimlAppSid ? '...configured...' : 'missing',
    phoneNumber: phoneNumber ? '...configured...' : 'missing'
  });
});