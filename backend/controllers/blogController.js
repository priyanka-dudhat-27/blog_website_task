const Blog = require("../models/blogModel");
const User = require("../models/userModel");


module.exports.getAllblogs = async (req, res) => {
    try {
        const blogData = await Blog.find().populate("user","name");
        if (blogData) {
            return res.status(200).json({ totalBlogs: blogData.length, blogData });
        } else {
            return res.status(404).json({ message: "No blogs found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something wrong" });
    }
};

module.exports.add = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const user = req.user._id // Extracted from the token by the requireLogin middleware

        if (!title || !description || !image) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        // Check if user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create blog
        const blogData = await Blog.create({ title, description, image, user });

        if (blogData) {
            // Update user's blogs array
            await User.findByIdAndUpdate(user, { $push: { blogs: blogData._id } });

            return res.status(200).json({ message: "Blog created successfully", data: blogData });
        } else {
            return res.status(500).json({ message: "Failed to create blog" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.update = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const blogId = await Blog.findById(req.params.id);
        if (blogId) {
            const updateData = await Blog.findByIdAndUpdate(blogId._id, req.body, { new: true });
            if (updateData) {
                return res.status(200).json({ message: "Blog updated successfully", data: updateData });
            } else {
                return res.status(404).json({ message: "Failed to update blog" });
            }
        } else {
            return res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something wrong in update API" });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const blogId = await Blog.findById(req.params.id);
        if (blogId) {
            const deleteData = await Blog.findByIdAndDelete(blogId._id);
            if (deleteData) {
                await User.findByIdAndUpdate(deleteData.user, { $pull: { blogs: deleteData._id } });
                return res.status(200).json({ message: "Blog deleted successfully" });
            } else {
                return res.status(404).json({ message: "Failed to delete blog" });
            }
        } else {
            return res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something wrong in delete API" });
    }
};

module.exports.getByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const userBlogs = await Blog.find({ user: userId }).populate("user", "name");
        console.log(userBlogs);

        if (userBlogs.length > 0) {
            return res.status(200).json(userBlogs);
        } else {
            return res.status(404).json({ message: "Blogs not found" });
        }
    } catch (error) {
        console.error('Error fetching blogs by user ID:', error);
        return res.status(500).json({ message: "Something went wrong in getByUserId API" });
    }
};
