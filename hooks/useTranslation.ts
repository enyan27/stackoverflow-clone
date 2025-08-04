import { useLanguage } from '@/context/Language';

const translations = {
    en: {
        navigation: {
            home: "Home",
            questions: "Questions",
            community: "Community",
            collections: "Collections",
            tags: "Tags",
            askaquestion: "Ask a Question",
            users: "Users",
            ask: "Ask Question",
            signIn: "Sign In",
            signUp: "Sign Up",
            profile: "Profile",
            signOut: "Sign Out"
        },
        common: {
            searchGlobal: "Search on the whole site",
            search: "Search",
            filter: "Filter",
            sort: "Sort",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            cancel: "Cancel",
            save: "Save",
            edit: "Edit",
            delete: "Delete",
            submit: "Submit",
            back: "Back",
            next: "Next",
            previous: "Previous"
        },
        home: {
            title: "Welcome to DevFlow",
            subtitle: "Ask questions, get answers, share knowledge",
            featuredQuestions: "Featured Questions",
            recentQuestions: "Recent Questions",
            popularTags: "Popular Tags"
        },
        questions: {
            title: "Questions",
            askQuestion: "Ask Question",
            noQuestions: "No questions found",
            views: "views",
            answers: "answers",
            votes: "votes"
        },
        auth: {
            signInTitle: "Sign In",
            signUpTitle: "Sign Up",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            forgotPassword: "Forgot Password?",
            dontHaveAccount: "Don't have an account?",
            alreadyHaveAccount: "Already have an account?",
            signInWith: "Sign in with",
            signUpWith: "Sign up with"
        },
        profile: {
            editProfile: "Edit Profile",
            name: "Name",
            username: "Username",
            bio: "Bio",
            location: "Location",
            website: "Website",
            joined: "Joined",
            reputation: "Reputation",
            questions: "Questions",
            answers: "Answers"
        },
        theme: {
            light: "Light",
            dark: "Dark",
            system: "System"
        }
    },
    vi: {
        navigation: {
            home: "Trang chủ",
            questions: "Câu hỏi",
            community: "Cộng đồng",
            collections: "Đã lưu",
            tags: "Thẻ",
            askaquestion: "Đặt câu hỏi",
            users: "Người dùng",
            ask: "Đặt câu hỏi",
            signIn: "Đăng nhập",
            signUp: "Đăng ký",
            profile: "Hồ sơ",
            signOut: "Đăng xuất"
        },
        common: {
            searchGlobal: "Tìm kiếm trên toàn bộ trang",
            search: "Tìm kiếm",
            filter: "Lọc",
            sort: "Sắp xếp",
            loading: "Đang tải...",
            error: "Lỗi",
            success: "Thành công",
            cancel: "Hủy",
            save: "Lưu",
            edit: "Chỉnh sửa",
            delete: "Xóa",
            submit: "Gửi",
            back: "Quay lại",
            next: "Tiếp theo",
            previous: "Trước"
        },
        home: {
            title: "Chào mừng đến với DevFlow",
            subtitle: "Đặt câu hỏi, nhận câu trả lời, chia sẻ kiến thức",
            featuredQuestions: "Câu hỏi nổi bật",
            recentQuestions: "Câu hỏi gần đây",
            popularTags: "Thẻ phổ biến"
        },
        questions: {
            title: "Câu hỏi",
            askQuestion: "Đặt câu hỏi",
            noQuestions: "Không tìm thấy câu hỏi",
            views: "lượt xem",
            answers: "câu trả lời",
            votes: "bình chọn"
        },
        auth: {
            signInTitle: "Đăng nhập",
            signUpTitle: "Đăng ký",
            email: "Email",
            password: "Mật khẩu",
            confirmPassword: "Xác nhận mật khẩu",
            forgotPassword: "Quên mật khẩu?",
            dontHaveAccount: "Chưa có tài khoản?",
            alreadyHaveAccount: "Đã có tài khoản?",
            signInWith: "Đăng nhập bằng",
            signUpWith: "Đăng ký bằng"
        },
        profile: {
            editProfile: "Chỉnh sửa hồ sơ",
            name: "Tên",
            username: "Tên người dùng",
            bio: "Tiểu sử",
            location: "Vị trí",
            website: "Trang web",
            joined: "Tham gia",
            reputation: "Danh tiếng",
            questions: "Câu hỏi",
            answers: "Câu trả lời"
        },
        theme: {
            light: "Sáng",
            dark: "Tối",
            system: "Hệ thống"
        }
    }
};

export function useTranslation() {
    const { language } = useLanguage();

    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = translations[language as keyof typeof translations];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    return { t, language };
} 