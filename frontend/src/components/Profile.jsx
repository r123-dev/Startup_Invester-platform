// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   CircularProgress,
//   Card,
//   CardContent,
//   Divider,
// } from "@mui/material";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => {
//       try {
//         // Assuming user data was stored during login like:
//         // localStorage.setItem("user", JSON.stringify(userData));
//         const storedUser = localStorage.getItem("user");

//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         }
//       } catch (error) {
//         console.error("Error reading user data:", error);
//       }
//       setLoading(false);
//     }, 500);
//   }, []);

//   if (loading)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//         <Typography sx={{ mt: 2, opacity: 0.7 }}>Loading profile...</Typography>
//       </Box>
//     );

//   if (!user)
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Typography color="error">No user data found. Please log in.</Typography>
//       </Box>
//     );

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//       <Card sx={{ width: "100%", maxWidth: 500, borderRadius: 3, boxShadow: 3, p: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
//           <Avatar
//             sx={{
//               bgcolor: "primary.main",
//               width: 80,
//               height: 80,
//               fontSize: 32,
//               mb: 2,
//             }}
//           >
//             {user?.name?.[0]?.toUpperCase() || "U"}
//           </Avatar>

//           <Typography variant="h5" fontWeight={600}>
//             👤 {user?.name || "User"}
//           </Typography>
//           <Typography variant="body2" sx={{ opacity: 0.7 }}>
//             {user?.email || "No email found"}
//           </Typography>
//         </Box>

//         <Divider sx={{ my: 3 }} />

//         <CardContent>
//           <Typography variant="subtitle1" fontWeight={600}>
//             Profile Type:
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             {user?.role === "COMPANY" ? "🏢 Company" : "🙋 Enthusiast"}
//           </Typography>

//           {user?.role === "COMPANY" && (
//             <>
//               <Typography variant="subtitle1" fontWeight={600}>
//                 Company Name:
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 {user?.companyName || "N/A"}
//               </Typography>

//               <Typography variant="subtitle1" fontWeight={600}>
//                 Company Description:
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 {user?.description || "No description provided."}
//               </Typography>
//             </>
//           )}

//           {user?.role === "ENTHUSIAST" && (
//             <>
//               <Typography variant="subtitle1" fontWeight={600}>
//                 Interests:
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 {user?.interests || "No interests mentioned."}
//               </Typography>
//             </>
//           )}

//           <Typography variant="subtitle1" fontWeight={600}>
//             Joined:
//           </Typography>
//           <Typography variant="body2">
//             {user?.createdAt
//               ? new Date(user.createdAt).toLocaleDateString()
//               : "N/A"}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          No data found. Please login again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight={600}>
        👤 Profile Section
      </Typography>
      <Paper sx={{ mt: 3, p: 3, mx: "auto", maxWidth: 400 }}>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user.role || "Not specified"}
        </Typography>
        <Typography variant="body1">
          <strong>User ID:</strong> {user.sub}
        </Typography>
      </Paper>
    </Box>
  );
}
