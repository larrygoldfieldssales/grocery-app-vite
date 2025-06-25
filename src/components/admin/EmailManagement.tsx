import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Package,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'order' | 'customer' | 'supplier' | 'marketing';
}

interface SentEmail {
  id: string;
  to: string;
  subject: string;
  status: 'sent' | 'delivered' | 'failed';
  sentAt: string;
  type: string;
}

export function EmailManagement() {
  const { toast } = useToast();
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    message: '',
    type: 'customer'
  });

  const [supplierRequestForm, setSupplierRequestForm] = useState({
    supplierEmail: '',
    productName: '',
    quantity: '',
    urgency: 'normal',
    additionalNotes: ''
  });

  // Mock data - in real app, this would come from your backend
  const [emailTemplates] = useState<EmailTemplate[]>([
    {
      id: 'TEMP-001',
      name: 'Order Confirmation',
      subject: 'Your FreshExpress Order Confirmation - #{orderNumber}',
      content: 'Thank you for your order! Your order #{orderNumber} has been confirmed and will be delivered within 60 minutes.',
      type: 'order'
    },
    {
      id: 'TEMP-002',
      name: 'Delivery Update',
      subject: 'Your order is out for delivery!',
      content: 'Great news! Your order #{orderNumber} is now out for delivery and should arrive within the next 30 minutes.',
      type: 'order'
    },
    {
      id: 'TEMP-003',
      name: 'Product Request to Supplier',
      subject: 'Product Request - {productName}',
      content: 'We would like to request {quantity} units of {productName}. Please confirm availability and delivery timeline.',
      type: 'supplier'
    }
  ]);

  const [sentEmails] = useState<SentEmail[]>([
    {
      id: 'EMAIL-001',
      to: 'john.doe@email.com',
      subject: 'Your FreshExpress Order Confirmation - #ORD-001',
      status: 'delivered',
      sentAt: '2024-01-15T10:30:00Z',
      type: 'Order Confirmation'
    },
    {
      id: 'EMAIL-002',
      to: 'supplier@freshfarm.co.za',
      subject: 'Product Request - Fresh Bananas',
      status: 'sent',
      sentAt: '2024-01-15T09:15:00Z',
      type: 'Supplier Request'
    },
    {
      id: 'EMAIL-003',
      to: 'jane.smith@email.com',
      subject: 'Your order is out for delivery!',
      status: 'delivered',
      sentAt: '2024-01-15T08:45:00Z',
      type: 'Delivery Update'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendEmail = async () => {
    if (!emailForm.to || !emailForm.subject || !emailForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would make an API call to send the email
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Email Sent",
        description: `Email sent successfully to ${emailForm.to}`
      });

      // Reset form
      setEmailForm({
        to: '',
        subject: '',
        message: '',
        type: 'customer'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSupplierRequest = async () => {
    if (!supplierRequestForm.supplierEmail || !supplierRequestForm.productName || !supplierRequestForm.quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Supplier Request Sent",
        description: `Product request sent to ${supplierRequestForm.supplierEmail}`
      });

      // Reset form
      setSupplierRequestForm({
        supplierEmail: '',
        productName: '',
        quantity: '',
        urgency: 'normal',
        additionalNotes: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send supplier request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const useTemplate = (template: EmailTemplate) => {
    setEmailForm({
      ...emailForm,
      subject: template.subject,
      message: template.content
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="supplier">Supplier Requests</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Email History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Compose Email
              </CardTitle>
              <CardDescription>
                Send emails to customers, suppliers, or other recipients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-to">To (Email Address) *</Label>
                  <Input
                    id="email-to"
                    type="email"
                    placeholder="recipient@email.com"
                    value={emailForm.to}
                    onChange={(e) => setEmailForm({...emailForm, to: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-type">Email Type</Label>
                  <Select value={emailForm.type} onValueChange={(value) => setEmailForm({...emailForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select email type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer Communication</SelectItem>
                      <SelectItem value="supplier">Supplier Communication</SelectItem>
                      <SelectItem value="order">Order Related</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject *</Label>
                <Input
                  id="email-subject"
                  placeholder="Enter email subject"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-message">Message *</Label>
                <Textarea
                  id="email-message"
                  placeholder="Enter your message here..."
                  rows={8}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                />
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  Use templates below to speed up your email composition
                </div>
                <Button onClick={handleSendEmail}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>Click to use predefined email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{template.subject}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => useTemplate(template)}
                      className="w-full"
                    >
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplier" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Send Product Request to Supplier
              </CardTitle>
              <CardDescription>
                Request products from your suppliers with detailed specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier-email">Supplier Email *</Label>
                  <Input
                    id="supplier-email"
                    type="email"
                    placeholder="supplier@company.com"
                    value={supplierRequestForm.supplierEmail}
                    onChange={(e) => setSupplierRequestForm({...supplierRequestForm, supplierEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={supplierRequestForm.urgency} onValueChange={(value) => setSupplierRequestForm({...supplierRequestForm, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name *</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g., Fresh Bananas"
                    value={supplierRequestForm.productName}
                    onChange={(e) => setSupplierRequestForm({...supplierRequestForm, productName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Required *</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 50 kg or 100 units"
                    value={supplierRequestForm.quantity}
                    onChange={(e) => setSupplierRequestForm({...supplierRequestForm, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Any specific requirements, delivery instructions, or additional information..."
                  rows={4}
                  value={supplierRequestForm.additionalNotes}
                  onChange={(e) => setSupplierRequestForm({...supplierRequestForm, additionalNotes: e.target.value})}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSupplierRequest}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request to Supplier
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Email Templates
              </CardTitle>
              <CardDescription>
                Manage and customize your email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline" className="mt-1">{template.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" onClick={() => useTemplate(template)}>
                          Use Template
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Subject:</strong> {template.subject}</p>
                      <p className="text-sm text-gray-600">{template.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Email History
              </CardTitle>
              <CardDescription>
                View all sent emails and their delivery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentEmails.map((email) => (
                      <TableRow key={email.id}>
                        <TableCell className="font-medium">{email.to}</TableCell>
                        <TableCell>{email.subject}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{email.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(email.status)}
                            <Badge className={getStatusColor(email.status)}>
                              {email.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(email.sentAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
