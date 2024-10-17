"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Book,
  Lightbulb,
  Target,
  Zap,
  Coffee,
  Wifi,
  Utensils,
  Camera,
  Ticket,
} from "lucide-react";
import { createClient } from "@/lib/supabase";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  organization: z.string().optional(),
  role: z.string().optional(),
});

const ChainbaseMeetup = () => {
  const supabase = createClient();
  const eventDetails = [
    {
      icon: <Calendar className="w-6 h-6 mr-2" />,
      label: "Date",
      value: "October 20, 2024",
    },
    {
      icon: <Clock className="w-6 h-6 mr-2" />,
      label: "Time",
      value: "9:00 AM - 6:00 PM",
    },
    {
      icon: <MapPin className="w-6 h-6 mr-2" />,
      label: "Venue",
      value: "Chainspace Hub uyo, udo udoma avenue , Akwa ibom state , Nigeria",
    },
    {
      icon: <Users className="w-6 h-6 mr-2" />,
      label: "Host",
      value: "Chainspace",
    },
    {
      icon: <Book className="w-6 h-6 mr-2" />,
      label: "Theme",
      value: "Unlocking Blockchain Potential with Chainbase Tools",
    },
    {
      icon: <Ticket className="w-6 h-6 mr-2" />,
      label: "Registration Fee",
      value: "Free",
    },
    {
      icon: <Users className="w-6 h-6 mr-2" />,
      label: "Capacity",
      value: "100 attendees",
    },
    {
      icon: <Wifi className="w-6 h-6 mr-2" />,
      label: "Wi-Fi",
      value: "Free high-speed internet available",
    },
    {
      icon: <Utensils className="w-6 h-6 mr-2" />,
      label: "Refreshments",
      value: "Lunch and refreshments provided",
    },
    {
      icon: <Camera className="w-6 h-6 mr-2" />,
      label: "Recording",
      value: "Sessions will be recorded and shared post-event",
    },
  ];

  const agenda = [
    {
      time: "09:00 - 09:30",
      session: "Registration and Welcome",
      description: "Check-in, distribution of event materials, networking",
    },
    {
      time: "09:30 - 10:00",
      session: "Opening Ceremony",
      description:
        "Welcome address, event overview, introduction to Chainbase and Chainspace",
    },
    {
      time: "10:00 - 11:00",
      session: "Chainbase Product Showcase: API",
      description:
        "Features, capabilities, use cases, and applications of Chainbase API",
    },
    {
      time: "11:00 - 11:30",
      session: "Coffee Break and Networking",
      description: "",
    },
    {
      time: "11:30 - 12:30",
      session: "Chainbase Product Showcase: Manuscript",
      description:
        "Overview of Chainbase Manuscript, benefits for developers and researchers",
    },
    { time: "12:30 - 13:30", session: "Lunch Break", description: "" },
    {
      time: "13:30 - 14:30",
      session: "Interactive Demo Sessions",
      description:
        "Hands-on demonstrations of Chainbase products, Q&A with Chainbase team",
    },
    {
      time: "14:30 - 15:00",
      session: "Mini Hackathon Kickoff",
      description: "Announcement of hackathon guidelines and team formation",
    },
    {
      time: "15:00 - 17:30",
      session: "Mini Hackathon",
      description:
        "Teams work on projects using Chainbase tools, mentors available for support",
    },
    {
      time: "17:30 - 18:00",
      session: "Project Presentations and Awards",
      description:
        "Teams present their projects, winners announced, closing remarks",
    },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialize React Hook Form with Zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase.from("registrations").insert([
        {
          name: values.name,
          email: values.email,
          organization: values.organization,
          role: values.role,
        },
      ]);

      if (error) throw error;

      console.log("Registration saved:", data);
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Error saving registration:", error);
      setSubmitError(
        "An error occurred while saving your registration. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-8 text-center text-blue-600"
      >
        Chainbase Meetup Nigeria
      </motion.h1>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="eventDetails">Event Details</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="hackathon">Hackathon</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <Card className="backdrop-blur-sm bg-white/30">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Event Description
              </CardTitle>
              <CardDescription>
                Detailed information about the Chainbase Meetup Nigeria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <section>
                  <h3 className="text-xl font-semibold flex items-center mb-2">
                    <Target className="w-6 h-6 mr-2 text-green-500" />
                    Event Overview
                  </h3>
                  <p>
                    Chainbase Meetup Nigeria is a one-day intensive gathering
                    designed to bring together blockchain enthusiasts,
                    developers, researchers, and industry professionals. This
                    event aims to showcase the power and versatility of
                    Chainbase tools while fostering innovation and collaboration
                    within the Nigerian blockchain community.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold flex items-center mb-2">
                    <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                    Key Highlights
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Product Showcases:</strong> In-depth
                      demonstrations of Chainbase API and Chainbase Manuscript,
                      highlighting their features and real-world applications.
                    </li>
                    <li>
                      <strong>Interactive Sessions:</strong> Hands-on workshops
                      where attendees can explore Chainbase tools with guidance
                      from experts.
                    </li>
                    <li>
                      <strong>Networking Opportunities:</strong> Multiple breaks
                      designed for attendees to connect, share ideas, and form
                      potential collaborations.
                    </li>
                    <li>
                      <strong>Mini Hackathon:</strong> An exciting competition
                      where participants can put their skills to the test, using
                      Chainbase tools to bring innovative ideas to life.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold flex items-center mb-2">
                    <Users className="w-6 h-6 mr-2 text-blue-500" />
                    Who Should Attend?
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Blockchain Developers:</strong> Enhance your
                      skills and learn how to leverage Chainbase tools in your
                      projects.
                    </li>
                    <li>
                      <strong>Data Analysts:</strong> Discover how Chainbase can
                      streamline your blockchain data analysis processes.
                    </li>
                    <li>
                      <strong>Researchers:</strong> Explore new possibilities in
                      blockchain research using Chainbase Manuscript.
                    </li>
                    <li>
                      <strong>Entrepreneurs:</strong> Gain insights into how
                      Chainbase tools can support and accelerate your
                      blockchain-based startups.
                    </li>
                    <li>
                      <strong>Students:</strong> Get a head start in the
                      blockchain industry by familiarizing yourself with
                      professional-grade tools.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold flex items-center mb-2">
                    <Coffee className="w-6 h-6 mr-2 text-brown-500" />
                    What to Expect
                  </h3>
                  <p>
                    Attendees can expect a day filled with learning,
                    collaboration, and innovation. From in-depth technical
                    sessions to creative problem-solving in the hackathon, this
                    event offers a comprehensive blockchain experience. You'll
                    have the opportunity to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                      Gain hands-on experience with cutting-edge blockchain
                      tools
                    </li>
                    <li>
                      Network with like-minded professionals and potential
                      collaborators
                    </li>
                    <li>
                      Showcase your skills and creativity in the mini hackathon
                    </li>
                    <li>
                      Learn about the latest trends and applications in
                      blockchain technology
                    </li>
                    <li>
                      Receive expert insights and guidance from Chainbase
                      professionals
                    </li>
                  </ul>
                </section>

                <p className="mt-4 font-semibold text-blue-600">
                  Join us for this unique opportunity to enhance your blockchain
                  skills, expand your network, and be part of Nigeria's growing
                  blockchain community!
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eventDetails">
          <Card className="backdrop-blur-sm bg-white/30">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Event Details
              </CardTitle>
              <CardDescription>
                Key information about the Chainbase Meetup Nigeria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {eventDetails.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-lg"
                  >
                    {detail.icon}
                    <span className="font-semibold mr-2">
                      {detail.label}:
                    </span>{" "}
                    {detail.value}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Additional Information
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dress Code: Business Casual</li>
                  <li>Language: The event will be conducted in English</li>
                  <li>Parking: Limited free parking available at the venue</li>
                  <li>
                    Accommodation: List of nearby hotels will be provided upon
                    registration
                  </li>
                  <li>
                    COVID-19 Precautions: Please follow local health guidelines
                  </li>
                </ul>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agenda">
          <Card className="backdrop-blur-sm bg-white/30">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Event Agenda
              </CardTitle>
              <CardDescription>
                Detailed schedule of the day's activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {agenda.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b pb-2"
                  >
                    <p className="font-bold text-blue-600">{item.time}</p>
                    <p className="text-lg font-semibold">{item.session}</p>
                    {item.description && (
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hackathon">
          <Card className="backdrop-blur-sm bg-white/30">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Mini Hackathon Details
              </CardTitle>
              <CardDescription>
                Information about our exciting and inclusive mini hackathon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center"
                >
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                  <span className="font-semibold">Theme:</span> "Innovate with
                  Chainbase: Your Vision, Our Tools"
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="ml-8"
                >
                  <p>
                    Build any blockchain-related project that excites you! Use
                    Chainbase tools to bring your unique ideas to life. Whether
                    it's DeFi, NFTs, data analytics, or something entirely new,
                    we welcome all innovative concepts.
                  </p>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center"
                >
                  <Users className="w-6 h-6 mr-2 text-green-500" />
                  <span className="font-semibold">Team Size:</span> 3-4 members
                  per team
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center"
                >
                  <Clock className="w-6 h-6 mr-2 text-red-500" />
                  <span className="font-semibold">Duration:</span> 2.5 hours
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center"
                >
                  <span className="font-semibold">Judging Criteria:</span>{" "}
                  Innovation, technical implementation, use of Chainbase tools,
                  presentation, and potential impact
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="font-semibold flex items-center mb-2">
                    <Award className="w-6 h-6 mr-2 text-purple-500" />
                    Prizes:
                  </span>
                  <ul className="list-disc ml-8 space-y-2">
                    <li className="text-lg text-blue-600 font-semibold">
                      1st Place:{" "}
                      <span className="text-gray-600 text-base font-normal">
                        To be announced
                      </span>
                    </li>
                    <li className="text-lg text-blue-600 font-semibold">
                      2nd Place:{" "}
                      <span className="text-gray-600 text-base font-normal">
                        To be announced
                      </span>
                    </li>
                    <li className="text-lg text-blue-600 font-semibold">
                      3rd Place:{" "}
                      <span className="text-gray-600 text-base font-normal">
                        To be announced
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2 ml-8">
                    Exciting rewards await the top performers. Stay tuned for
                    more details on the prizes!
                  </p>
                </motion.li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration">
          <Card className="backdrop-blur-sm bg-white/30">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Registration
              </CardTitle>
              <CardDescription>
                Sign up for the Chainbase Meetup Nigeria
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {submitError && (
                      <p className="text-red-500 text-sm">{submitError}</p>
                    )}
                    <Button type="submit" className="w-full">
                      Register Now
                    </Button>
                  </form>
                </Form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <p className="text-lg font-semibold text-green-600 mb-4">
                    Thank you for registering! We look forward to seeing you at
                    the event.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4"
                  >
                    Register Another Attendee
                  </Button>
                </motion.div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">
                For any registration queries, please contact:
                events@chainbase.com
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChainbaseMeetup;
