From node:lts

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Expose the port your frontend app listens on
EXPOSE 3000

# Set the command to serve the built frontend
CMD ["serve", "-s", "build"]