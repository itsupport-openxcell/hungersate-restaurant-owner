"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog"
import Layout from "@/components/Layout"
import { useAuth } from "@/contexts/AuthContext"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Camera,
  Shield,
  Bell,
  Key,
  Settings,
  Palette,
  Monitor,
} from "lucide-react"

export default function MyAccount() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    restaurantName: user?.restaurantName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: "123 Food Street, Mumbai, Maharashtra 400001",
    description: "A family-owned restaurant serving authentic Indian cuisine for over 20 years.",
    website: "www.spicegarden.com",
    socialMedia: {
      facebook: "facebook.com/spicegarden",
      instagram: "instagram.com/spicegarden",
      twitter: "twitter.com/spicegarden",
    },
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: true,
    loginAlerts: true,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    compactView: false,
    analyticsTracking: true,
    marketingCommunications: false,
    language: "English",
    timezone: "Asia/Kolkata",
  })

  const handleSaveProfile = async () => {
    await updateProfile(profileData)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleSecurityChange = (setting: string, value: boolean) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
    // Simulate saving to backend
    setTimeout(() => {
      alert(`${setting} ${value ? "enabled" : "disabled"} successfully!`)
    }, 500)
  }

  const handlePreferenceChange = (setting: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [setting]: value,
    }))

    // Apply changes immediately for visual feedback
    if (setting === "darkMode") {
      if (value) {
        document.documentElement.classList.add("dark")
        alert("Dark mode enabled! (Note: Full dark mode implementation would require theme provider)")
      } else {
        document.documentElement.classList.remove("dark")
        alert("Dark mode disabled!")
      }
    } else if (setting === "compactView") {
      alert(`Compact view ${value ? "enabled" : "disabled"}! Layout will be updated.`)
    } else if (setting === "analyticsTracking") {
      alert(`Analytics tracking ${value ? "enabled" : "disabled"}!`)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
          </div>
          <Badge variant="default" className="text-lg px-3 py-1">
            Restaurant Owner
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture & Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile Picture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {user?.restaurantName?.charAt(0) || "R"}
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                      variant="secondary"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold">{user?.restaurantName}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge variant="outline" className="mt-2">
                    Restaurant Owner
                  </Badge>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Restaurant Information</CardTitle>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                      >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <Input
                            id="restaurantName"
                            value={profileData.restaurantName}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, restaurantName: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <Input
                            id="mobile"
                            value={profileData.mobile}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, mobile: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Restaurant Address</Label>
                      <div className="flex items-start space-x-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400 mt-3" />
                        <Textarea
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          rows={2}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Restaurant Description</Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, description: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Social Media</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <Input
                          placeholder="Facebook URL"
                          value={profileData.socialMedia.facebook}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              socialMedia: { ...prev.socialMedia, facebook: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                        />
                        <Input
                          placeholder="Instagram URL"
                          value={profileData.socialMedia.instagram}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              socialMedia: { ...prev.socialMedia, instagram: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                        />
                        <Input
                          placeholder="Twitter URL"
                          value={profileData.socialMedia.twitter}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              socialMedia: { ...prev.socialMedia, twitter: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified of new logins</p>
                    </div>
                    <Switch
                      checked={securitySettings.loginAlerts}
                      onCheckedChange={(checked) => handleSecurityChange("loginAlerts", checked)}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full" onClick={() => setIsPasswordDialogOpen(true)}>
                      <Key className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={securitySettings.emailNotifications}
                      onCheckedChange={(checked) => handleSecurityChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates via SMS</p>
                    </div>
                    <Switch
                      checked={securitySettings.smsNotifications}
                      onCheckedChange={(checked) => handleSecurityChange("smsNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Display Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <Switch
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => handlePreferenceChange("darkMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact View</Label>
                      <p className="text-sm text-gray-600">Show more content in less space</p>
                    </div>
                    <Switch
                      checked={preferences.compactView}
                      onCheckedChange={(checked) => handlePreferenceChange("compactView", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Language & Region</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Language</Label>
                      <Input value={preferences.language} disabled className="mt-1" />
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Input value={preferences.timezone} disabled className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="w-5 h-5" />
                    <span>Data & Privacy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics Tracking</Label>
                      <p className="text-sm text-gray-600">Help us improve by sharing usage data</p>
                    </div>
                    <Switch
                      checked={preferences.analyticsTracking}
                      onCheckedChange={(checked) => handlePreferenceChange("analyticsTracking", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
                    </div>
                    <Switch
                      checked={preferences.marketingCommunications}
                      onCheckedChange={(checked) => handlePreferenceChange("marketingCommunications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Change Password Dialog */}
        <ChangePasswordDialog isOpen={isPasswordDialogOpen} onClose={() => setIsPasswordDialogOpen(false)} />
      </div>
    </Layout>
  )
}
