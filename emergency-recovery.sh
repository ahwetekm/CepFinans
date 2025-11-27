#!/bin/bash

# ButcApp VPS Emergency Recovery Script
# Complete Node.js cleanup and fresh installation

set -e

echo "🚨 ButcApp Emergency Recovery - Complete Node.js Fix"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Force fix broken packages
print_status "Fixing broken packages..."
apt --fix-broken install -y

# Remove ALL Node.js related packages with force
print_status "Force removing ALL Node.js packages..."
apt remove --purge -y nodejs npm node-* 2>/dev/null || true
apt autoremove --purge -y
apt autoclean

# Remove Node.js repositories and keys
print_status "Cleaning Node.js repositories..."
rm -rf /etc/apt/sources.list.d/nodesource*
rm -rf /usr/share/keyrings/nodesource*
rm -rf /var/lib/apt/lists/*nodesource*

# Update package lists
apt update

# Install Node.js 20.x using binary distribution (most reliable)
print_status "Installing Node.js 20.x via binary distribution..."

# Download and extract Node.js binary
cd /usr/local
NODE_VERSION="20.12.2"
wget "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz"
tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz"
mv "node-v${NODE_VERSION}-linux-x64" nodejs
rm "node-v${NODE_VERSION}-linux-x64.tar.xz"

# Create system-wide symlinks
print_status "Creating system-wide symlinks..."
ln -sf /usr/local/nodejs/bin/node /usr/bin/node
ln -sf /usr/local/nodejs/bin/npm /usr/bin/npm
ln -sf /usr/local/nodejs/bin/npx /usr/bin/npx

# Add to PATH for all users
echo 'export PATH=/usr/local/nodejs/bin:$PATH' >> /etc/profile
echo 'export PATH=/usr/local/nodejs/bin:$PATH' >> /etc/bash.bashrc

# Verify installation
print_status "Verifying Node.js installation..."
export PATH=/usr/local/nodejs/bin:$PATH
node --version
npm --version

# Install PM2
print_status "Installing PM2..."
npm install -g pm2

# Continue with ButcApp deployment
print_status "Continuing with ButcApp deployment..."
cd /root/ButcApp

# Install dependencies
export PATH=/usr/local/nodejs/bin:$PATH
npm install

# Build application
npm run build

# Setup PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'butcapp',
    script: 'npm',
    args: 'start',
    cwd: '/root/ButcApp',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# Start with PM2
export PATH=/usr/local/nodejs/bin:$PATH
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# Create startup script for PM2
cat > /etc/systemd/system/butcapp.service << EOF
[Unit]
Description=ButcApp Node.js Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/ButcApp
Environment=PATH=/usr/local/nodejs/bin
Environment=NODE_ENV=production
ExecStart=/usr/local/nodejs/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
systemctl daemon-reload
systemctl enable butcapp
systemctl start butcapp

print_status "✅ Emergency recovery completed!"
echo ""
echo "🎉 ButcApp is now running on port 3000"
echo "📊 PM2 status: pm2 status"
echo "📊 System status: systemctl status butcapp"
echo "🔄 To restart: systemctl restart butcapp"
echo ""
echo "Node.js $(node --version) installed successfully!"
echo "Application should be accessible at: http://$(curl -s ifconfig.me):3000"