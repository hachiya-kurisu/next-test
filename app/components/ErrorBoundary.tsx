'use client';

import React, { Component, ReactNode } from 'react';
import PageContainer from './ui/PageContainer';
import Heading from './ui/Heading';
import Button from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// fallback ui instead of crashing~
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <PageContainer>
          <section className="text-center py-16" role="alert" aria-live="assertive">
            <figure className="text-6xl mb-6" aria-hidden="true"> </figure>
            <Heading size="lg" className="mb-4 text-center">
              エラーが発生しました
            </Heading>
            <p className="text-secondary mb-8 max-w-md mx-auto">
              予期しないエラーが発生しました。もう一度試すか、ホームに戻ってください。
            </p>
            <nav className="flex gap-4 justify-center">
              <Button onClick={this.handleReset}>
                再試行
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
              >
                ホームへ
              </Button>
            </nav>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left max-w-2xl mx-auto">
                <summary className="cursor-pointer text-secondary hover:text-primary">
                  エラー詳細 (開発環境のみ)
                </summary>
                <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </section>
        </PageContainer>
      );
    }

    return this.props.children;
  }
}
