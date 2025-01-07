import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useFrappeCreateDoc } from "frappe-react-sdk";
import { Conversation } from "@/types/AiChatbot/Conversation";
import { useNavigate } from "react-router";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  file: z
    .custom<FileList>(
      (value) => value instanceof FileList && value.length > 0,
      {
        message: "File is required",
      }
    )
    .refine((files) => files[0]?.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

type Props = {};

const CreateConversation = (props: Props) => {
  const navigate = useNavigate();

  const { createDoc } = useFrappeCreateDoc<Conversation>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("file_name", file.name);
    formData.append("is_private", "0");

    const response = await fetch("/api/method/upload_file", {
      method: "POST",
      body: formData,
      credentials: "include", // To include Frappe session cookies
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const data = await response.json();
    return data.message.file_url; // Return the uploaded file URL
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.file) return;

    const fileUrl = await uploadFile(values.file[0]);

    const docPayload = {
      title: values.title,
      file: fileUrl,
    };

    // @ts-ignore
    const res = await createDoc("Conversation", docPayload);

    navigate(res.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Start conversation</Button>
      </form>
    </Form>
  );
};

export default CreateConversation;
