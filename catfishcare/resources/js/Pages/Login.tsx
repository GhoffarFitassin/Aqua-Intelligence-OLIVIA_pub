import { useState } from "react";
import { User, Lock, Eye, EyeOff, Fish, Info, Loader2 } from "lucide-react";
import type { AppUser, Theme } from "@/Types";

interface AuthProps {
    onLoginSuccess: (user: AppUser) => void;
    theme: Theme;
}

const Auth = ({ onLoginSuccess }: AuthProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "" });

    const showAlert = (message: string, type = "error") => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: "", type: "" }), 4000);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            showAlert("Mohon isi username dan kata sandi Anda.", "error");
            return;
        }

        setIsLoading(true);
        setAlert({ message: "", type: "" });

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg =
                    data.errors?.username?.[0] ||
                    data.message ||
                    "Username atau kata sandi salah.";
                showAlert(errorMsg, "error");
                return;
            }

            // Store the Sanctum token for subsequent API requests
            localStorage.setItem("aqua_token", data.token);

            showAlert("Login berhasil! Mengalihkan...", "success");

            const user: AppUser = {
                username: data.user.username,
                name: data.user.username,
                id: data.user.id,
            };

            setTimeout(() => onLoginSuccess(user), 800);
        } catch {
            showAlert(
                "Gagal terhubung ke server. Pastikan server Laravel berjalan.",
                "error",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-bg-glow" />
            <div className="auth-bg-glow-right" />
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <Fish size={32} />
                    </div>
                    <h2>OLIVIA System</h2>
                    <p>Aqua-Intelligence & Harvest Failure Prevention</p>
                </div>
                {alert.message && (
                    <div className={`auth-alert ${alert.type}`}>
                        <Info size={16} />
                        <span>{alert.message}</span>
                    </div>
                )}
                <form onSubmit={handleLoginSubmit}>
                    <div className="auth-form-group">
                        <label htmlFor="login-username">USERNAME</label>
                        <div className="auth-input-wrapper">
                            <User size={16} className="auth-input-icon" />
                            <input
                                id="login-username"
                                type="text"
                                className="auth-input"
                                placeholder="Masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="login-pwd">KATA SANDI</label>
                        <div className="auth-input-wrapper">
                            <Lock size={16} className="auth-input-icon" />
                            <input
                                id="login-pwd"
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="auth-toggle-pwd"
                                onClick={() => setShowPassword(!showPassword)}
                                title={
                                    showPassword
                                        ? "Sembunyikan sandi"
                                        : "Tampilkan sandi"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            "Masuk ke Dashboard"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
