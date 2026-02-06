/**
 * REPLY CLASSIFIER AGENT
 * Analyzes email replies and classifies sentiment
 * Routes replies to appropriate next steps
 */

interface EmailReply {
  replyId: string;
  leadId: string;
  leadEmail: string;
  subject: string;
  body: string;
  receivedAt: Date;
}

interface ClassifiedReply {
  replyId: string;
  leadId: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  reasoning: string;
  nextAction: 'schedule_call' | 'send_followup' | 'archive' | 'manual_review';
  extractedInfo?: {
    interest: boolean;
    timeline?: string;
    budget?: string;
    objections?: string[];
  };
}

export class ReplyClassifierAgent {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Classify email reply
   */
  async classifyReply(reply: EmailReply): Promise<ClassifiedReply> {
    console.log(`📬 Reply Classifier Agent: Analyzing reply from ${reply.leadEmail}...`);

    // Analyze sentiment
    const sentiment = this.analyzeSentiment(reply.body);

    // Extract key information
    const extractedInfo = this.extractInformation(reply.body);

    // Determine next action
    const nextAction = this.determineNextAction(sentiment, extractedInfo);

    const classified: ClassifiedReply = {
      replyId: reply.replyId,
      leadId: reply.leadId,
      sentiment,
      confidence: this.calculateConfidence(reply.body),
      reasoning: this.generateReasoning(sentiment, extractedInfo),
      nextAction,
      extractedInfo,
    };

    console.log(`✅ Reply classified: ${classified.sentiment}`);
    console.log(`   - Confidence: ${(classified.confidence * 100).toFixed(0)}%`);
    console.log(`   - Next Action: ${classified.nextAction}`);

    return classified;
  }

  /**
   * Analyze sentiment of reply
   */
  private analyzeSentiment(
    body: string
  ): 'positive' | 'neutral' | 'negative' {
    // Simulate sentiment analysis
    // In production, use NLP library or API (e.g., Hugging Face, OpenAI)

    const positiveKeywords = [
      'interested',
      'great',
      'love',
      'perfect',
      'yes',
      'absolutely',
      'definitely',
      'would like',
      'let\'s',
      'excited',
    ];
    const negativeKeywords = [
      'not interested',
      'no thanks',
      'not right now',
      'too expensive',
      'not a fit',
      'unsubscribe',
      'remove',
      'spam',
    ];

    const lowerBody = body.toLowerCase();

    const positiveCount = positiveKeywords.filter((kw) =>
      lowerBody.includes(kw)
    ).length;
    const negativeCount = negativeKeywords.filter((kw) =>
      lowerBody.includes(kw)
    ).length;

    if (positiveCount > negativeCount && positiveCount > 0) {
      return 'positive';
    } else if (negativeCount > positiveCount && negativeCount > 0) {
      return 'negative';
    }
    return 'neutral';
  }

  /**
   * Extract key information from reply
   */
  private extractInformation(body: string): ClassifiedReply['extractedInfo'] {
    const lowerBody = body.toLowerCase();

    return {
      interest: lowerBody.includes('interested') || lowerBody.includes('interested'),
      timeline: this.extractTimeline(body),
      budget: this.extractBudget(body),
      objections: this.extractObjections(body),
    };
  }

  /**
   * Extract timeline from reply
   */
  private extractTimeline(body: string): string | undefined {
    const timelinePatterns = [
      /next\s+(week|month|quarter)/i,
      /in\s+(\d+)\s+(weeks?|months?)/i,
      /asap/i,
      /immediately/i,
    ];

    for (const pattern of timelinePatterns) {
      const match = body.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return undefined;
  }

  /**
   * Extract budget information from reply
   */
  private extractBudget(body: string): string | undefined {
    const budgetPattern = /\$[\d,]+|\d+k|\d+m/i;
    const match = body.match(budgetPattern);
    return match ? match[0] : undefined;
  }

  /**
   * Extract objections from reply
   */
  private extractObjections(body: string): string[] {
    const objections: string[] = [];

    if (body.toLowerCase().includes('price') || body.toLowerCase().includes('cost')) {
      objections.push('Price/Cost');
    }
    if (body.toLowerCase().includes('timing') || body.toLowerCase().includes('now')) {
      objections.push('Timing');
    }
    if (body.toLowerCase().includes('fit') || body.toLowerCase().includes('need')) {
      objections.push('Product Fit');
    }

    return objections;
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(body: string): number {
    // Simulate confidence calculation
    // Higher confidence for longer, more detailed replies
    const wordCount = body.split(/\s+/).length;
    const confidence = Math.min(wordCount / 100, 1);
    return Math.max(confidence, 0.5); // Minimum 50% confidence
  }

  /**
   * Generate reasoning for classification
   */
  private generateReasoning(
    sentiment: string,
    extractedInfo: ClassifiedReply['extractedInfo'] | undefined
  ): string {
    let reasoning = `Sentiment: ${sentiment}. `;

    if (extractedInfo?.interest) {
      reasoning += 'Lead expressed interest. ';
    }

    if (extractedInfo?.timeline) {
      reasoning += `Timeline mentioned: ${extractedInfo.timeline}. `;
    }

    if (extractedInfo?.objections && extractedInfo.objections.length > 0) {
      reasoning += `Objections: ${extractedInfo.objections.join(', ')}. `;
    }

    return reasoning;
  }

  /**
   * Determine next action based on classification
   */
  private determineNextAction(
    sentiment: string,
    extractedInfo: ClassifiedReply['extractedInfo'] | undefined
  ): ClassifiedReply['nextAction'] {
    if (sentiment === 'positive') {
      return 'schedule_call';
    } else if (sentiment === 'neutral' && extractedInfo?.interest) {
      return 'send_followup';
    } else if (sentiment === 'negative') {
      return 'archive';
    }
    return 'manual_review';
  }

  /**
   * Batch classify multiple replies
   */
  async batchClassifyReplies(
    replies: EmailReply[]
  ): Promise<ClassifiedReply[]> {
    console.log(`📬 Classifying ${replies.length} replies...`);

    const classified: ClassifiedReply[] = [];

    for (const reply of replies) {
      const result = await this.classifyReply(reply);
      classified.push(result);
    }

    console.log(`✅ Classified ${classified.length} replies`);
    console.log(
      `   - Positive: ${classified.filter((c) => c.sentiment === 'positive').length}`
    );
    console.log(
      `   - Neutral: ${classified.filter((c) => c.sentiment === 'neutral').length}`
    );
    console.log(
      `   - Negative: ${classified.filter((c) => c.sentiment === 'negative').length}`
    );

    return classified;
  }

  /**
   * Get summary of classifications
   */
  getSummary(classified: ClassifiedReply[]): {
    total: number;
    positive: number;
    neutral: number;
    negative: number;
    avgConfidence: number;
  } {
    const positive = classified.filter((c) => c.sentiment === 'positive').length;
    const neutral = classified.filter((c) => c.sentiment === 'neutral').length;
    const negative = classified.filter((c) => c.sentiment === 'negative').length;
    const avgConfidence =
      classified.reduce((sum, c) => sum + c.confidence, 0) / classified.length;

    return {
      total: classified.length,
      positive,
      neutral,
      negative,
      avgConfidence,
    };
  }
}
