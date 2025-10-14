-- Messages table for contact form submissions
-- This table stores all contact form messages from the website

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  
  -- Sender Information
  sender_name VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(50),
  
  -- Message Content
  subject VARCHAR(500) DEFAULT 'Contact Form Submission',
  content TEXT NOT NULL,
  
  -- Status and Management
  is_read BOOLEAN DEFAULT FALSE,
  is_important BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'in_progress', 'resolved', 'archived'
  
  -- Additional Metadata
  ip_address INET,
  user_agent TEXT,
  source VARCHAR(100) DEFAULT 'contact_form', -- 'contact_form', 'api', 'admin'
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_sender_email ON messages(sender_email);

-- Enable Row Level Security (optional - can be disabled for admin access)
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows admins to see all messages
-- CREATE POLICY "Admins can view all messages" ON messages
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comment on table and important columns
COMMENT ON TABLE messages IS 'Stores contact form submissions and customer messages';
COMMENT ON COLUMN messages.status IS 'Message status: new, in_progress, resolved, archived';
COMMENT ON COLUMN messages.is_important IS 'Flag for high priority messages';
COMMENT ON COLUMN messages.source IS 'Source of the message: contact_form, api, admin';
