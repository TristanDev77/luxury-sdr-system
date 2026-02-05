/**
 * REPLY & INTENT CLASSIFIER AGENT
 * Reads all inbound replies from Instantly or LinkedIn
 * Classifies replies and routes them appropriately
 */

import { InboundReply, ReplyClassificationResult, ReplyIntent } from '../types';

export class ReplyClassifierAgent {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Check for new replies in the campaign
   */
  async checkForNewReplies(campaignId: string): Promise<InboundReply[]> {
    console.log(`📬 Reply Classifier Agent: Checking for new replies in campaign ${campaignId}`);

    // In production, this would:
    // 1. Query Instantly API for new replies
    // 2. Query LinkedIn for new messages
    // 3. Aggregate all replies

    return [];
  }

  /**
   * Classify a single reply based on intent
   */
  async classifyReply(reply: InboundReply): Promise<ReplyClassificationResult> {
    console.log(`🔍 Classifying reply from ${reply.senderEmail}`);

    // Analyze the message content
    const intent = this.analyzeIntent(reply.message);
    const confidence = this.calculateConfidence(reply.message, intent);
    const reasoning = this.generateReasoning(reply.message, intent);
    const suggestedResponse = this.generateSuggestedResponse(intent, reply);

    const result: ReplyClassificationResult = {
      replyId: reply.id,
      intent,
      confidence,
      reasoning,
      nextAction: this.determineNextAction(intent),
      suggestedResponse,
    };

    console.log(`✅ Reply classified as: ${intent} (confidence: ${confidence}%)`);

    return result;
  }

  /**
   * Analyze intent from message content
   */
  private analyzeIntent(message: string): ReplyIntent {
    const lowerMessage = message.toLowerCase();

    // Positive intent indicators
    if (
      lowerMessage.includes('interested') ||
      lowerMessage.includes('sounds good') ||
      lowerMessage.includes('let\'s talk') ||
      lowerMessage.includes('when can we') ||
      lowerMessage.includes('tell me more') ||
      lowerMessage.includes('this looks great')
    ) {
      return 'Positive Intent';
    }

    // Objection indicators
    if (
      lowerMessage.includes('too expensive') ||
      lowerMessage.includes('not the right time') ||
      lowerMessage.includes('we already have') ||
      lowerMessage.includes('not interested') ||
      lowerMessage.includes('don\'t need')
    ) {
      return 'Objection';
    }

    // Not interested indicators
    if (
      lowerMessage.includes('remove me') ||
      lowerMessage.includes('stop emailing') ||
      lowerMessage.includes('unsubscribe') ||
      lowerMessage.includes('no thanks')
    ) {
      return 'Not Interested';
    }

    // OOO indicators
    if (
      lowerMessage.includes('out of office') ||
      lowerMessage.includes('on vacation') ||
      lowerMessage.includes('back on') ||
      lowerMessage.includes('auto-reply')
    ) {
      return 'OOO / Bounce';
    }

    // Default to neutral
    return 'Neutral / Questions';
  }

  /**
   * Calculate confidence score for classification
   */
  private calculateConfidence(message: string, intent: ReplyIntent): number {
    // Simple heuristic: longer, more detailed messages = higher confidence
    const wordCount = message.split(/\s+/).length;
    let confidence = Math.min(wordCount * 5, 95);

    // Adjust based on intent clarity
    if (intent === 'Positive Intent' || intent === 'Not Interested') {
      confidence = Math.min(confidence + 10, 100);
    }

    return Math.round(confidence);
  }

  /**
   * Generate reasoning for the classification
   */
  private generateReasoning(message: string, intent: ReplyIntent): string {
    const reasons: Record<ReplyIntent, string> = {
      'Positive Intent': 'Message contains clear interest signals and engagement indicators',
      'Neutral / Questions': 'Message asks clarifying questions or seeks more information',
      'Objection': 'Message raises concerns or obstacles but shows some interest',
      'Not Interested': 'Message clearly indicates no interest or requests removal',
      'OOO / Bounce': 'Message is an auto-reply or indicates unavailability',
    };

    return reasons[intent];
  }

  /**
   * Generate suggested response based on intent
   */
  private generateSuggestedResponse(intent: ReplyIntent, reply: InboundReply): string {
    const responses: Record<ReplyIntent, string> = {
      'Positive Intent': `Thank you for your interest, {{firstName}}! I'd love to schedule a time that works best for you. Are you available for a brief call this week?`,
      'Neutral / Questions': `Great question, {{firstName}}! Here's what I'd suggest... [Provide detailed answer]. Would you like to explore this further?`,
      'Objection': `I completely understand your concern about {{objection}}. Many of our clients had similar thoughts initially. Here's how we typically address this...`,
      'Not Interested': `No problem at all, {{firstName}}. I appreciate you letting me know. If circumstances change, feel free to reach out.`,
      'OOO / Bounce': `Thanks for the auto-reply. I'll follow up when you're back. Looking forward to connecting then!`,
    };

    return responses[intent];
  }

  /**
   * Determine next action based on intent
   */
  private determineNextAction(intent: ReplyIntent): 'Trigger Gaia Call' | 'Send Follow-up' | 'Handle Objection' | 'Close Loop' | 'Archive' {
    const actions: Record<ReplyIntent, any> = {
      'Positive Intent': 'Trigger Gaia Call',
      'Neutral / Questions': 'Send Follow-up',
      'Objection': 'Handle Objection',
      'Not Interested': 'Close Loop',
      'OOO / Bounce': 'Archive',
    };

    return actions[intent];
  }

  /**
   * Close the loop on a lead (mark as not interested)
   */
  async closeLoop(leadId: string): Promise<void> {
    console.log(`🔚 Closing loop on lead ${leadId}`);
    // In production, this would update the lead status in the database
  }
}
