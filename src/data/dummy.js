import directorPic from '../assets/director pic/director.png';
import principlePic from '../assets/principle pic/principle.png';
import gallery1 from '../assets/gallary/Screenshot 2026-07-03 215527.png';
import gallery2 from '../assets/gallary/Screenshot 2026-07-03 215535.png';
import gallery3 from '../assets/gallary/Screenshot 2026-07-03 215542.png';
import gallery4 from '../assets/gallary/Screenshot 2026-07-03 215553.png';
import gallery5 from '../assets/gallary/Screenshot 2026-07-03 215600.png';
import gallery6 from '../assets/gallary/Screenshot 2026-07-03 215610.png';
import gallery7 from '../assets/gallary/Screenshot 2026-07-03 215619.png';
import gallery8 from '../assets/gallary/Screenshot 2026-07-03 215630.png';

export const dummyNews = [
  {
    id: 1,
    title: "Annual Science Fair Winners Announced!",
    date: "2026-06-20",
    excerpt: "Congratulations to all the participants and winners of this year's Science Fair. The ingenuity on display was truly inspiring.",
    imageUrl: "https://images.unsplash.com/photo-1564426225274-124b172a6e60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "New Sports Complex Opening Next Month",
    date: "2026-06-18",
    excerpt: "Our brand new sports complex is almost ready. We can't wait to see our student athletes make the most of these world-class facilities.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Guest Speaker Series: Tech Leaders",
    date: "2026-06-15",
    excerpt: "Join us this Friday for an inspiring talk by top tech leaders who will share their journey and insights with our students.",
    imageUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export const dummyEvents = [
  {
    id: 1,
    title: "Parent-Teacher Conferences",
    date: "2026-07-10",
    time: "4:00 PM - 7:00 PM",
    location: "Main Hall",
  },
  {
    id: 2,
    title: "Summer Music Concert",
    date: "2026-07-15",
    time: "6:00 PM - 8:00 PM",
    location: "School Auditorium",
  },
  {
    id: 3,
    title: "Alumni Meet & Greet",
    date: "2026-07-22",
    time: "10:00 AM - 2:00 PM",
    location: "School Cafeteria",
  }
];

export const dummyStaff = [
  {
    id: 1,
    name: "Dr. Eleanor Vance",
    role: "Principal",
    bio: "Dr. Vance has over 20 years of experience in education leadership, driving innovation and excellence.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Mr. Arthur Pendelton",
    role: "Head of Science",
    bio: "Passionate about physics and chemistry, Mr. Pendelton ensures every student gets hands-on lab experience.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Ms. Sarah Jenkins",
    role: "Head of Arts",
    bio: "An accomplished artist herself, Ms. Jenkins fosters creativity and expression in all her students.",
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }
];

export const dummyPrograms = [
  {
    id: 1,
    title: "Advanced Sciences",
    description: "A rigorous curriculum designed for students aiming for careers in STEM, featuring state-of-the-art labs.",
    icon: "FlaskConical",
  },
  {
    id: 2,
    title: "Performing Arts",
    description: "Comprehensive training in theater, music, and dance with multiple annual productions.",
    icon: "Music",
  },
  {
    id: 3,
    title: "Global Athletics",
    description: "Championship-winning sports programs fostering teamwork, discipline, and physical excellence.",
    icon: "Trophy",
  },
  {
    id: 4,
    title: "Digital Innovation",
    description: "Cutting-edge courses in coding, robotics, and digital media design.",
    icon: "Monitor",
  }
];

export const dummyStats = [
  { label: "Students", value: "1,200+" },
  { label: "Faculty Members", value: "85" },
  { label: "Clubs & Activities", value: "40+" },
  { label: "Board Exam Passing", value: "98%" },
];

export const dummyGallery = [
  {
    id: 1,
    title: "Annual Sports Day",
    imageUrl: gallery1
  },
  {
    id: 2,
    title: "Science Exhibition",
    imageUrl: gallery2
  },
  {
    id: 3,
    title: "Cultural Festival",
    imageUrl: gallery3
  },
  {
    id: 4,
    title: "Library Study Time",
    imageUrl: gallery4
  },
  {
    id: 5,
    title: "Computer Lab Session",
    imageUrl: gallery5
  },
  {
    id: 6,
    title: "Art Class",
    imageUrl: gallery6
  },
  {
    id: 7,
    title: "Campus View",
    imageUrl: gallery7
  },
  {
    id: 8,
    title: "Extracurriculars",
    imageUrl: gallery8
  }
];

export const directorMessage = {
  name: "Mr. Pardeep Rao",
  title: "Director, Saraswati Vidya Sr Sec School",
  message: "Education is not merely the filling of a pail, but the lighting of a fire. At Saraswati Vidya Sr Sec School, our goal is to ignite that spark of curiosity in every child. We are committed to providing a holistic education that empowers our students to be compassionate, innovative, and resilient leaders of tomorrow. Our dedicated faculty works tirelessly to create an environment where every student is encouraged to reach their full potential, both academically and personally.",
  imageUrl: directorPic
};

export const principalMessage = {
  name: "Dr. Anupma Yadav",
  title: "Principal, Saraswati Vidya Sr Sec School",
  message: "Welcome to our vibrant learning community. Our focus is on nurturing not just academic excellence, but also the character and values that will guide our students through life. We believe in creating a safe, inclusive, and challenging environment where every student feels valued and inspired to explore their passions.",
  imageUrl: principlePic
};
