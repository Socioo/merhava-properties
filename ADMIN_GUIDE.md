# MERHAVA PROPERTIES - Admin Guide

## Admin Dashboard Access

The admin dashboard is located at: `/admin/login`

### Creating the First Admin Account

Since the database is new, you need to create the first admin account manually using Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and create a user with email/password
4. Copy the User ID (UUID) from the created user
5. Go to Database > Table Editor > admin_users
6. Click "Insert row" and add:
   - id: [paste the User ID from step 4]
   - email: [the email you created]
   - full_name: [admin's full name]
7. Save the row

Now you can login at `/admin/login` with the email and password you created.

## Admin Features

### Dashboard (`/admin/dashboard`)
- View statistics: total properties, available properties, sold/rented properties, and land plots
- See recent properties added to the system
- Quick access to add new properties

### Manage Properties (`/admin/properties`)
- View all properties in the database
- Filter by category: Residential, Commercial, or Land
- Edit any property
- Delete properties
- Real-time updates when properties change

### Add New Property (`/admin/properties/add`)
- Add residential properties with bedrooms, bathrooms, and features
- Add commercial properties with business-specific details
- Add land plots with plot size, zoning, topography, and utilities
- All fields are validated for data integrity

### Edit Property (`/admin/properties/edit/[id]`)
- Modify existing property details
- Update property status (Available, Sold, Rented)
- Change property images
- Update pricing and location

## Property Fields Explained

### Basic Information (All Properties)
- **Title**: Property name/description
- **Price**: Can be formatted as "₦1,200,000" or "₦2,500/month"
- **Location**: Area and region
- **Category**: Residential, Commercial, or Land
- **Type**: For Sale or For Rent
- **Status**: Available, Sold, or Rented
- **Square Footage**: Total area in sqft
- **Image URL**: Path to property image (e.g., /images/properties/villa-1.jpg)

### Property-Specific Fields (Residential & Commercial)
- **Bedrooms**: Number of bedrooms
- **Bathrooms**: Number of bathrooms (can include decimals like 2.5)
- **Features**: Comma-separated list (e.g., "Swimming Pool, Garden, Security, Parking")

### Land-Specific Fields
- **Plot Size**: Size description (e.g., "1 Acre", "0.5 Acres")
- **Zoning**: Property zoning type (e.g., "Residential", "Commercial")
- **Topography**: Land terrain (e.g., "Flat", "Gentle Slope")
- **Access Road**: Checkbox for road access availability
- **Utilities**: Comma-separated list (e.g., "Water, Electricity, Sewer")

## Security

### Row Level Security (RLS)
The database has Row Level Security enabled:
- All users can view available properties
- Only authenticated admins can create, update, or delete properties
- Admin access is verified through the `admin_users` table

### Authentication
- Admin login uses Supabase Authentication
- Sessions are managed automatically
- Admins are automatically signed out after a period of inactivity
- Only users in the `admin_users` table can access the dashboard

## Best Practices

1. **Adding Properties**:
   - Use clear, descriptive titles
   - Ensure images are properly sized and optimized
   - Use consistent pricing formats
   - Fill in all relevant fields for better search results

2. **Property Status**:
   - Mark properties as "Sold" or "Rented" when no longer available
   - Regularly update property information
   - Remove or archive old properties

3. **Images**:
   - Store images in the `/public/images/properties/` directory
   - Use descriptive filenames
   - Recommended size: 800x600px or similar aspect ratio
   - Keep file sizes under 500KB for fast loading

4. **Features & Utilities**:
   - Use comma-separated values
   - Be specific and accurate
   - Common features: Swimming Pool, Garden, Security, Parking, Gym, etc.

## Public Website

The public website automatically displays properties from the database:
- **Home Page** (`/`): Shows 4 most recent available properties
- **Properties Page** (`/properties`): Shows all properties with filtering
- **About Page** (`/about`): Company information and team
- **Contact Page** (`/contact`): Contact form for inquiries

## Troubleshooting

### Can't Login
- Verify your account exists in the `admin_users` table
- Check that the email matches the authentication user
- Ensure the password is correct

### Properties Not Showing
- Check that properties have `status = 'available'`
- Verify the property was saved successfully
- Refresh the page to see latest data

### Database Issues
- All data is stored in Supabase
- Check the Supabase dashboard for any connection issues
- Verify RLS policies are active

## Support

For technical issues or questions, contact the development team.
