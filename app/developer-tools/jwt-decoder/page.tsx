'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Eye, EyeOff, RefreshCw, Check, AlertCircle, ChevronDown, ChevronUp, Shield, Lock, Key, FileText, Code, Zap } from 'lucide-react';
import Head from 'next/head';

type DecodedJwt = {
  header: any;
  payload: any;
};

export default function JwtDecoderPage() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // SEO Section Dropdown States
  const [openSections, setOpenSections] = useState({
    whatItDoes: true,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related Tools Data
  const relatedTools = [
    { name: 'JSON to CSV Converter', path: '/developer-tools/json-to-csv', icon: FileText },
    { name: 'Base64 Encoder / Decoder', path: '/developer-tools/base64-encoder-decoder', icon: Lock },
    { name: 'Regex Tester', path: '/developer-tools/regex-tester', icon: Code },
    { name: 'UUID Generator', path: '/developer-tools/uuid-generator', icon: Key },
    { name: 'Unix Timestamp Converter', path: '/developer-tools/unix-timestamp', icon: Zap },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is a JWT (JSON Web Token) and how does it work?",
      answer: "A JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting information between parties as JSON objects. JWTs consist of three parts: header (algorithm and token type), payload (claims/statements about the user), and signature (verification). The token is digitally signed using a secret or public/private key pair, ensuring data integrity and (optionally) encryption."
    },
    {
      question: "Does this JWT decoder verify the token signature?",
      answer: "No, this decoder only displays the header and payload sections of a JWT. Signature verification requires the secret key or public key used to sign the token, which is not provided to the tool for security reasons. Always verify signatures in production environments using proper cryptographic libraries."
    },
    {
      question: "What are common JWT claims and what do they mean?",
      answer: "Common standard claims include: 'sub' (subject/user ID), 'iat' (issued at timestamp), 'exp' (expiration time), 'iss' (issuer), 'aud' (audience), and 'nbf' (not before). Custom claims can also be added for application-specific data like user roles, permissions, or additional user information."
    },
    {
      question: "Are JWTs secure for authentication?",
      answer: "JWTs are secure when implemented correctly: use strong algorithms (HS256, RS256), keep secrets secure, implement proper token expiration, use HTTPS, store tokens securely on clients, and validate all claims. However, JWTs have limitations and aren't suitable for all use cases—session-based authentication might be better for some applications."
    },
    {
      question: "Can I decode any JWT token with this tool?",
      answer: "Yes, this tool can decode any standard JWT token regardless of the signing algorithm, as it only reads the Base64Url-encoded header and payload sections. However, expired tokens, malformed tokens, or tokens with incorrect Base64 encoding may produce errors. The tool does not validate signatures or check token validity."
    }
  ];

  const base64UrlDecode = (str: string) => {
    try {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      return JSON.parse(atob(padded));
    } catch {
      throw new Error('Invalid Base64 encoding');
    }
  };

  const decodeJwt = () => {
    setError('');
    setDecoded(null);
    setCopied(false);

    if (!token.trim()) {
      setError('Please enter a JWT token to decode');
      return;
    }

    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format: Token must have exactly 3 parts separated by dots');
      }

      const header = base64UrlDecode(parts[0]);
      const payload = base64UrlDecode(parts[1]);

      setDecoded({ header, payload });
    } catch (err: any) {
      setError(err.message || 'Failed to decode JWT. Please check the token format.');
    }
  };

  const clearAll = () => {
    setToken('');
    setDecoded(null);
    setError('');
    setCopied(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setToken(e.target.value);
    setError('');
  };

  return (
    <>
      <Head>
        <title>JWT Decoder | Free Online JSON Web Token Decoder - GrockTool.com</title>
        <meta name="description" content="Decode and analyze JWT (JSON Web Token) tokens instantly with our free online decoder. View header and payload information without verification." />
        <meta name="keywords" content="JWT decoder, JSON Web Token, token decoder, JWT analyzer, JWT token, authentication token, decode JWT, JWT header, JWT payload, security token" />
        <meta property="og:title" content="JWT Decoder | Free Online JSON Web Token Decoder - GrockTool.com" />
        <meta property="og:description" content="Free online JWT decoder tool to inspect and analyze JSON Web Token headers and payloads instantly. Perfect for developers debugging authentication tokens." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JWT Decoder - GrockTool.com" />
        <meta name="twitter:description" content="Free online JWT decoder for inspecting JSON Web Token structure and claims." />
        <link rel="canonical" href="https://grocktool.com/developer-tools/jwt-decoder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "JWT Decoder Tool",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "description": "Free online tool to decode and analyze JWT (JSON Web Token) tokens, displaying header and payload information without verification",
            "url": "https://grocktool.com/developer-tools/jwt-decoder",
            "author": {
              "@type": "Organization",
              "name": "GrockTool.com",
              "url": "https://grocktool.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "JWT token decoding",
              "Header inspection",
              "Payload analysis",
              "JSON pretty printing",
              "Token validation",
              "Clipboard copy functionality"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-background font-inter">
        <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
          <div className="max-w-lg mx-auto lg:max-w-4xl">
            {/* Header */}
            <div className="mb-8 sm:mb-10">
              <Link
                href="/tool"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Developer Tools
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  JWT Decoder – Fast, Accurate & Free
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Decode and analyze JSON Web Token (JWT) tokens instantly
                </p>
              </motion.div>
            </div>

            {/* Main Tool Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              {/* Token Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-foreground">
                    JWT Token Input
                  </label>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield size={12} />
                    <span>Paste your JWT token</span>
                  </div>
                </div>
                <textarea
                  value={token}
                  onChange={handleTokenChange}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  className="w-full min-h-[150px] p-4 bg-input border border-border rounded-lg sm:rounded-xl focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-ring focus:ring-opacity-50 resize-none text-foreground placeholder-muted-foreground font-mono text-sm"
                />
                
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={clearAll}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RefreshCw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
                <button
                  onClick={decodeJwt}
                  disabled={!token.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye size={16} className="sm:w-4 sm:h-4" />
                  Decode JWT
                </button>
              </div>

              {/* Decoded Results */}
              {decoded && (
                <div className="mt-8 space-y-6">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-600">
                      ✓ Successfully decoded JWT token
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Header Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-foreground">Header</h3>
                        <button
                          onClick={() => copyToClipboard(formatJson(decoded.header))}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
                          {formatJson(decoded.header)}
                        </pre>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          <span>Algorithm: {decoded.header.alg || 'Not specified'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          <span>Type: {decoded.header.typ || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payload Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-foreground">Payload</h3>
                        <button
                          onClick={() => copyToClipboard(formatJson(decoded.payload))}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                        <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
                          {formatJson(decoded.payload)}
                        </pre>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {decoded.payload.exp && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            <span>Expires: {new Date(decoded.payload.exp * 1000).toLocaleString()}</span>
                          </div>
                        )}
                        {decoded.payload.iat && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            <span>Issued: {new Date(decoded.payload.iat * 1000).toLocaleString()}</span>
                          </div>
                        )}
                        {decoded.payload.sub && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            <span>Subject: {decoded.payload.sub}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-8 shadow-sm"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How to Decode a JWT Token</h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p>
                  This tool allows you to decode and inspect JWT tokens to view their header and payload information.
                </p>
                <div className="text-xs sm:text-sm space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Paste your JWT token into the input field above</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Click "Decode JWT" to parse and display the token components</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Review the header (algorithm and token type) and payload (claims)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span>Copy individual sections or use "Clear All" to start over</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Content Section with Dropdowns */}
            <section className="space-y-4">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">JWT Decoder - What It Does</h2>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This free online JWT (JSON Web Token) decoder provides instant insight into the structure and content of authentication tokens used in modern web applications and APIs. The tool safely decodes the Base64Url-encoded header and payload sections of a JWT, displaying them in human-readable JSON format without requiring access to secret keys or performing cryptographic verification.
                    </p>
                    <p className="text-muted-foreground">
                      Designed for developers, security professionals, and API integrators, this decoder helps debug authentication flows, verify token claims, and understand JWT structure. It automatically detects standard JWT claims like expiration time (exp), issued at (iat), subject (sub), and issuer (iss), while also displaying custom application-specific claims. The tool provides valuable debugging capabilities for troubleshooting authentication issues, verifying token contents, and ensuring proper JWT implementation in your applications.
                    </p>
                  </div>
                )}
              </article>

              {/* Use Cases Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('useCases')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Practical Use Cases for JWT Decoding</h2>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      JWT decoding serves essential purposes across various development and security scenarios:
                    </p>
                    <ul className="space-y-3 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Authentication Debugging</strong>
                        <p className="mt-1">Troubleshoot authentication issues by inspecting token contents, verifying claims, and checking expiration times during development and testing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">API Integration & Testing</strong>
                        <p className="mt-1">Verify that APIs are generating and accepting correct JWT tokens with appropriate claims and structure during integration testing.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Security Auditing & Analysis</strong>
                        <p className="mt-1">Analyze JWT tokens during security reviews to ensure proper implementation, check for sensitive data exposure, and verify claim validity.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Educational & Learning</strong>
                        <p className="mt-1">Understand JWT structure and claims for learning purposes, helping developers grasp authentication concepts and token-based security.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Production Issue Resolution</strong>
                        <p className="mt-1">Quickly decode tokens from logs or error reports to diagnose authentication failures in production environments.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Third-Party Integration</strong>
                        <p className="mt-1">Verify tokens received from third-party services to ensure they contain expected claims and follow agreed-upon standards.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Documentation & Training</strong>
                        <p className="mt-1">Create documentation examples and training materials with real JWT tokens (with sensitive data removed) for team education.</p>
                      </li>
                    </ul>
                  </div>
                )}
              </article>

              {/* How to Use This Tool - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">How to Use This JWT Decoder Effectively</h2>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <ol className="space-y-4 text-muted-foreground pl-5">
                      <li className="pl-2">
                        <strong className="text-foreground">Obtain Your JWT Token</strong>
                        <p className="mt-1">Get the JWT token from your application's authentication response, API request headers (Authorization: Bearer token), or browser storage (localStorage/sessionStorage).</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Input Token Safely</strong>
                        <p className="mt-1">Paste the full JWT token into the input field. For sensitive production tokens, consider using test tokens or redacting sensitive information first.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Decode the Token</strong>
                        <p className="mt-1">Click "Decode JWT" to parse the token. The tool will display the header (algorithm, type) and payload (claims, user data) in readable JSON format.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Analyze Token Components</strong>
                        <p className="mt-1">Review the header for algorithm information and the payload for claims like exp (expiration), iat (issued at), sub (subject), and custom application claims.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Check Timestamps</strong>
                        <p className="mt-1">Verify token expiration (exp) and issue time (iat) to ensure tokens are valid. Convert Unix timestamps to readable dates for easier understanding.</p>
                      </li>
                      <li className="pl-2">
                        <strong className="text-foreground">Copy or Clear Results</strong>
                        <p className="mt-1">Use the copy buttons to save decoded information for documentation or debugging. Use "Clear All" to securely remove tokens and start fresh.</p>
                      </li>
                    </ol>
                  </div>
                )}
              </article>

              {/* Example Input and Output - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('examples')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">JWT Token Examples</h2>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Below are example JWT tokens and their decoded structures:
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 1: Standard Authentication Token</h3>
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">JWT Token:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjIsInJvbGUiOiJ1c2VyIn0.LBH9pR0kS5TZk0Xp1sQ4KjG7VqyW8zYbXc3dN2eF1g`}
                            </pre>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Decoded Header:</h4>
                              <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "alg": "HS256",
  "typ": "JWT"
}`}
                              </pre>
                            </div>
                            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                              <h4 className="text-sm font-semibold text-foreground mb-2">Decoded Payload:</h4>
                              <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516239622,
  "role": "user"
}`}
                              </pre>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            This token uses HS256 algorithm, expires 10 minutes after issuance (1516239622 - 1516239022 = 600 seconds), and includes custom "role" claim.
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Example 2: API Access Token with More Claims</h3>
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">JWT Token:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
{`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGktc2VydmljZSIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tIiwic3ViIjoiYWJjMTIzIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwic2NvcGUiOiJyZWFkIHdyaXRlIiwiaWF0IjoxNjU5MDAwMDAwLCJleHAiOjE2NTkwMzYwMDAsImp0aSI6ImFiY2RlZjEyMyJ9.sample_signature_here`}
                            </pre>
                          </div>
                          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Key Payload Claims:</h4>
                            <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
{`{
  "iss": "api-service",          // Issuer
  "aud": "https://api.example.com", // Audience
  "sub": "abc123",               // Subject/User ID
  "email": "user@example.com",   // User email
  "scope": "read write",         // Permissions
  "iat": 1659000000,             // Issued at
  "exp": 1659036000,             // Expires at (10 hours later)
  "jti": "abcdef123"             // Unique token ID
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions About JWTs</h2>
                  {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.faqs && (
                  <div className="px-6 pb-6">
                    <div className="space-y-6">
                      {faqData.map((faq, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Security Disclaimer */}
                    <div className="mt-8 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Important Security Notice</h3>
                      <p className="text-sm text-muted-foreground">
                        This tool only decodes JWT tokens and does NOT verify signatures or validate token authenticity. Never share production JWT tokens containing sensitive information. For production use, always verify tokens using proper cryptographic libraries with your secret keys. This decoder is for debugging and educational purposes only. Ensure you follow security best practices: use strong algorithms, keep secrets secure, implement proper token expiration, and validate all claims in production applications.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">More Developer Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Explore other useful developer tools from our Developer Tools category:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={index}
                            href={tool.path}
                            className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                          >
                            <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Icon size={18} className="text-accent" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                              <div className="text-xs text-muted-foreground">Visit tool →</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}