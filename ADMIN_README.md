# Admin Dashboard

This admin dashboard provides comprehensive management capabilities for the platform.

## Features

### Dashboard Overview (`/admin`)

- **Statistics Cards**: Display total counts of clients, freelancers, and projects
- **Quick Actions**: Direct navigation to management pages
- **Real-time Data**: Automatically fetches and displays current platform statistics

### Clients Management (`/admin/clients`)

- **View All Clients**: Complete list of registered clients with detailed information
- **Client Information**: Name, email, phone, location, position, and join date
- **Actions**: View details and delete client accounts
- **Data Table**: Sortable and searchable client data

### Freelancers Management (`/admin/freelancers`)

- **View All Freelancers**: Complete list of registered freelancers
- **Freelancer Information**: Name, email, phone, location, position, skills, bids, and hourly rate
- **Skills Display**: Shows freelancer skills with badge formatting
- **Actions**: View details and delete freelancer accounts
- **Data Table**: Comprehensive freelancer data with skill and bid information

### Projects Management (`/admin/projects`)

- **View All Projects**: Complete list of platform projects
- **Project Information**: Title, description, budget, skills, categories, status, and milestones
- **Status Tracking**: Shows whether projects are assigned or open
- **Actions**: View details and delete projects
- **Data Table**: Detailed project information with status indicators

## API Endpoints

### Statistics

- `GET /api/admin/stats` - Get platform statistics (clients, freelancers, projects count)

### Clients

- `GET /api/admin/clients` - Get all clients
- `DELETE /api/admin/clients/[id]` - Delete a specific client

### Freelancers

- `GET /api/admin/freelancers` - Get all freelancers
- `DELETE /api/admin/freelancers/[id]` - Delete a specific freelancer

### Projects

- `GET /api/admin/projects` - Get all projects
- `DELETE /api/admin/projects/[id]` - Delete a specific project

## Navigation

The admin dashboard includes a top navigation bar with:

- **Dashboard**: Main overview page
- **Clients**: Client management
- **Freelancers**: Freelancer management
- **Projects**: Project management
- **Back to Site**: Return to main application

## Data Table Features

All management pages include:

- **Sortable Columns**: Click column headers to sort data
- **Actions Dropdown**: Three-dot menu for each row with options
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Shows loading spinners while fetching data
- **Error Handling**: Displays appropriate error messages
- **Confirmation Modals**: Professional confirmation dialogs for delete operations
- **Toast Notifications**: Success/error messages with auto-dismiss functionality

## Security Considerations

- All delete operations require confirmation
- API routes include proper error handling
- Database operations are properly connected and secured
- User and profile data is properly linked for deletion

## Usage

1. Navigate to `/admin` to access the dashboard
2. Use the navigation bar to switch between different management sections
3. Click on statistics cards to navigate to specific management pages
4. Use the actions dropdown (three dots) to perform operations on individual records
5. Confirm delete operations when prompted

## Components Used

- **shadcn/ui**: Modern UI components for tables, cards, buttons, and dropdowns
- **Lucide React**: Icons for navigation and actions
- **Tailwind CSS**: Styling and responsive design
- **Next.js**: Server-side rendering and API routes
