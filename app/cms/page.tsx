"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from "@/components/Layout"
import { FileText, Save, Edit, Eye } from "lucide-react"

// Mock CMS data
const mockCMSPages = {
  aboutUs: {
    title: "About Us",
    content: `Welcome to HungerSate Restaurant!

We are a family-owned restaurant that has been serving delicious, authentic cuisine for over 20 years. Our passion for food and commitment to quality has made us a favorite destination for food lovers.

Our Story:
Founded in 2004 by Chef Rajesh Kumar, HungerSate started as a small family kitchen with a dream to share traditional recipes with the world. Today, we continue to honor those traditions while embracing modern culinary techniques.

Our Mission:
To provide exceptional dining experiences through authentic flavors, fresh ingredients, and warm hospitality. We believe that food brings people together and creates lasting memories.

What Makes Us Special:
- Fresh ingredients sourced daily from local markets
- Traditional recipes passed down through generations
- Expert chefs with years of experience
- Warm and welcoming atmosphere
- Commitment to customer satisfaction

Visit us today and experience the taste of tradition!`,
    lastUpdated: new Date("2024-01-15"),
  },
  privacyPolicy: {
    title: "Privacy Policy",
    content: `Privacy Policy for HungerSate Restaurant

Last updated: January 15, 2024

1. Information We Collect
We collect information you provide directly to us, such as when you:
- Create an account
- Place an order
- Contact us for support
- Subscribe to our newsletter

2. How We Use Your Information
We use the information we collect to:
- Process and fulfill your orders
- Communicate with you about your orders
- Provide customer support
- Send you promotional materials (with your consent)
- Improve our services

3. Information Sharing
We do not sell, trade, or otherwise transfer your personal information to third parties except:
- To fulfill your orders (delivery partners)
- To comply with legal requirements
- With your explicit consent

4. Data Security
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. Your Rights
You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Opt-out of marketing communications

6. Contact Us
If you have any questions about this Privacy Policy, please contact us at:
Email: privacy@hungersate.com
Phone: +91 9876543210`,
    lastUpdated: new Date("2024-01-15"),
  },
  termsConditions: {
    title: "Terms & Conditions",
    content: `Terms and Conditions for HungerSate Restaurant

Last updated: January 15, 2024

1. Acceptance of Terms
By using our services, you agree to be bound by these Terms and Conditions.

2. Service Description
HungerSate provides online food ordering and delivery services. We reserve the right to modify or discontinue our services at any time.

3. User Accounts
- You must provide accurate information when creating an account
- You are responsible for maintaining the security of your account
- You must be at least 18 years old to use our services

4. Orders and Payment
- All orders are subject to availability
- Prices are subject to change without notice
- Payment must be made at the time of ordering
- We reserve the right to cancel orders for any reason

5. Delivery
- Delivery times are estimates and may vary
- Delivery charges apply as specified
- Risk of loss passes to you upon delivery

6. Cancellation and Refunds
- Orders can be cancelled within 5 minutes of placement
- Refunds will be processed according to our refund policy
- We reserve the right to refuse refunds in certain circumstances

7. Limitation of Liability
Our liability is limited to the amount paid for the specific order in question.

8. Governing Law
These terms are governed by the laws of India.

9. Contact Information
For questions about these terms, contact us at:
Email: legal@hungersate.com
Phone: +91 9876543210`,
    lastUpdated: new Date("2024-01-15"),
  },
  faqs: {
    title: "Frequently Asked Questions",
    content: `Frequently Asked Questions

1. How do I place an order?
You can place an order through our website or mobile app. Simply browse our menu, add items to your cart, and proceed to checkout.

2. What are your delivery hours?
We deliver from 9:00 AM to 11:00 PM, Monday through Sunday.

3. What is your delivery area?
We currently deliver within a 10 km radius of our restaurant location.

4. How long does delivery take?
Typical delivery time is 30-45 minutes, depending on your location and order complexity.

5. Do you offer contactless delivery?
Yes, we offer contactless delivery. Please specify this preference when placing your order.

6. What payment methods do you accept?
We accept cash on delivery, credit/debit cards, UPI, and digital wallets.

7. Can I modify my order after placing it?
Orders can be modified within 5 minutes of placement. After that, please contact us directly.

8. Do you cater to dietary restrictions?
Yes, we offer vegetarian, vegan, and gluten-free options. Please check our menu for specific items.

9. How do I track my order?
You will receive SMS updates about your order status. You can also track your order through our app.

10. What if I'm not satisfied with my order?
Please contact us immediately at +91 9876543210. We'll work to resolve any issues promptly.

11. Do you offer catering services?
Yes, we provide catering for events and parties. Please contact us at least 24 hours in advance.

12. How can I provide feedback?
You can leave feedback through our app, website, or by calling us directly. We value your input!`,
    lastUpdated: new Date("2024-01-15"),
  },
}

export default function CMSPages() {
  const [cmsData, setCMSData] = useState(mockCMSPages)
  const [activeTab, setActiveTab] = useState("aboutUs")
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [editTitle, setEditTitle] = useState("")

  const handleEdit = (pageKey: string) => {
    const page = cmsData[pageKey as keyof typeof cmsData]
    setEditTitle(page.title)
    setEditContent(page.content)
    setIsEditing(true)
  }

  const handleSave = () => {
    setCMSData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab as keyof typeof prev],
        title: editTitle,
        content: editContent,
        lastUpdated: new Date(),
      },
    }))
    setIsEditing(false)
    alert("Page updated successfully!")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditTitle("")
    setEditContent("")
  }

  const currentPage = cmsData[activeTab as keyof typeof cmsData]

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">CMS Pages</h1>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => handleEdit(activeTab)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Page
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="aboutUs">About Us</TabsTrigger>
                <TabsTrigger value="privacyPolicy">Privacy Policy</TabsTrigger>
                <TabsTrigger value="termsConditions">Terms & Conditions</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pageTitle">Page Title</Label>
                      <Input
                        id="pageTitle"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pageContent">Page Content</Label>
                      <Textarea
                        id="pageContent"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="mt-1 min-h-[500px]"
                        placeholder="Enter page content..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">{currentPage.title}</h2>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FileText className="w-4 h-4" />
                        <span>Last updated: {currentPage.lastUpdated.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{currentPage.content}</div>
                    </div>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Page Preview */}
        {!isEditing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Page Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">How this page appears to customers:</h3>
                <div className="bg-white p-6 rounded border shadow-sm">
                  <h1 className="text-3xl font-bold mb-4 text-orange-600">{currentPage.title}</h1>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {currentPage.content.substring(0, 500)}...
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    This is a preview of how the content will appear on your website.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* SEO Information */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={`${currentPage.title} - HungerSate Restaurant`}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Input
                  id="metaDescription"
                  value={`Learn more about ${currentPage.title.toLowerCase()} at HungerSate Restaurant`}
                  readOnly
                  className="mt-1"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              SEO information is automatically generated based on your page content.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
